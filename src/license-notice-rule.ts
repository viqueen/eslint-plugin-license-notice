import type { Rule } from 'eslint';
import * as ESTree from 'estree';

const handleProgram =
    (_context: Rule.RuleContext) => (_node: ESTree.Program) => {
        // ignore
    };

const licenseNoticeRule = () => {
    return {
        key: 'license-notice',
        rule: {
            meta: {
                docs: {
                    description: 'include license notice header'
                },
                fixable: 'code',
                schema: [],
                messages: {
                    missingLicenseNotice: 'missing license notice header'
                }
            },
            create(context: Rule.RuleContext): Rule.RuleListener {
                return {
                    Program: handleProgram(context)
                };
            }
        }
    };
};

export { licenseNoticeRule };
