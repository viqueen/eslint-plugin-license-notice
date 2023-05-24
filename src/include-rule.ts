import type { Rule } from 'eslint';
import * as ESTree from 'estree';

const getFileHeader = (context: Rule.RuleContext, node: ESTree.Program) => {
    const comments = context.sourceCode.getCommentsBefore(node);
    return comments.find((comment) => comment.type === 'Block');
};

const handleProgram = (context: Rule.RuleContext) => (node: ESTree.Program) => {
    const [definition] = context.options;
    if (!definition) {
        context.report({
            node,
            message: 'missing license-notice configuration'
        });
        return;
    }
    const { license, copyRightYear, copyRightName } = definition;
    if (!license || !copyRightYear || !copyRightName) {
        context.report({
            node,
            message: 'invalid license-notice configuration'
        });
        return;
    }

    // handle ts files for now
    if (!context.filename.endsWith('.ts')) return;

    const header = getFileHeader(context, node);
    if (!header) {
        context.report({
            node,
            messageId: 'missingLicenseNotice',
            data: {
                license,
                copyRightYear,
                copyRightName
            }
        });
    }
};

const includeRule = () => {
    return {
        key: 'include',
        rule: {
            meta: {
                docs: {
                    description: 'include license notice header'
                },
                fixable: 'code',
                schema: [
                    {
                        type: 'object',
                        properties: {
                            license: { type: 'string' },
                            copyRightYear: { type: 'string ' },
                            copyRightName: { type: 'string' }
                        }
                    }
                ],
                messages: {
                    missingLicenseNotice:
                        'missing {{license}} copy-right ({{copyRightYear}}, {{copyRightName}}) license notice header'
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

export { includeRule };
