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
import { Rule } from 'eslint';
import * as ESTree from 'estree';

const handleImportDeclaration =
    (_context: Rule.RuleContext) =>
    (_node: ESTree.ImportDeclaration & Rule.NodeParentExtension) => {
        // todo
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
                schema: [],
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
