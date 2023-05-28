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
