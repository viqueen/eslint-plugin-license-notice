/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as fs from 'fs';
import path from 'path';

import { Rule } from 'eslint';
import * as ESTree from 'estree';

const handleImportDeclaration =
    (context: Rule.RuleContext) =>
    (node: ESTree.ImportDeclaration & Rule.NodeParentExtension) => {
        const [definition] = context.options;
        if (!definition) {
            context.report({
                node,
                message: 'missing import-modules configuration'
            });
            return;
        }
        const { alias, modulesDir } = definition;
        if (!alias || !modulesDir) {
            context.report({
                node,
                message: 'invalid import-modules configuration'
            });
            return;
        }
        const importValue = node.source.value as string;
        const monorepoImport = importValue.startsWith(alias);

        if (!monorepoImport) return;

        const patternStr = `${alias}[-]?([^/]+)/([^/]+)`;
        const pattern = new RegExp(patternStr);
        const matches = importValue.match(pattern);
        if (matches) return;

        const moduleRelative = importValue.replace(`${alias}/`, '');
        const packageFile = path.resolve(
            process.cwd(),
            modulesDir,
            moduleRelative,
            'package.json'
        );
        const moduleFile = path.resolve(
            process.cwd(),
            modulesDir,
            `${moduleRelative}.ts`
        );

        let packageName: string;
        if (fs.existsSync(packageFile)) {
            packageName = JSON.parse(
                fs.readFileSync(packageFile).toString()
            ).name;
        } else {
            // TODO: LABSET-139 context.getFilename is deprecated, but its replacement does not work
            const relative = path.relative(
                path.dirname(context.getFilename()),
                moduleFile
            );
            packageName = `./${relative.replace('.ts', '')}`;
        }

        context.report({
            node,
            messageId: 'invalidImport',
            data: {
                importPath: importValue,
                updatedPath: packageName
            },
            fix: (fixer) => {
                if (node.source) {
                    return fixer.replaceText(node.source, `'${packageName}'`);
                }
                return null;
            }
        });
    };

const importModulesRule = () => {
    return {
        key: 'import-modules',
        rule: {
            meta: {
                docs: {
                    description: 'import from monorepo module'
                },
                fixable: 'code',
                schema: [
                    {
                        type: 'object',
                        properties: {
                            alias: { type: 'string' },
                            modulesDir: { type: 'string ' }
                        }
                    }
                ],
                messages: {
                    invalidImport:
                        'Import from {{importPath}} should be replaced with {{updatedPath}}'
                }
            },
            create(context: Rule.RuleContext): Rule.RuleListener {
                return {
                    ImportDeclaration: handleImportDeclaration(context)
                };
            }
        }
    };
};

export { importModulesRule };
