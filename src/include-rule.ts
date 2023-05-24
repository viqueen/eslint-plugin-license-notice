import * as fs from 'fs';
import * as path from 'path';

import type { Rule } from 'eslint';
import * as ESTree from 'estree';

const supported = new Set(['Apache-2.0']);

const getFileHeader = (context: Rule.RuleContext, node: ESTree.Program) => {
    const comments = context.sourceCode.getCommentsBefore(node);
    const shebang = comments.find((comment) => {
        return (comment as ESTree.BaseNodeWithoutComments).type === 'Shebang';
    });
    const header = comments.find(
        (comment) => comment.type === 'Block' || comment.type === 'Line'
    );
    return {
        header,
        shebang
    };
};

const generateLicenseHeader = ({
    license,
    copyRightName,
    copyRightYear
}: {
    license: string;
    copyRightYear: string;
    copyRightName: string;
}): string => {
    const text = fs
        .readFileSync(path.resolve(__dirname, `${license}-license.js.txt`))
        .toString();
    return text
        .replace('{{copyRightYear}}', copyRightYear)
        .replace('{{copyRightName}}', copyRightName);
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
    if (!supported.has(license)) {
        context.report({
            node,
            message: 'unsupported license'
        });
        return;
    }

    // handle (t|j)sx? files for now
    const pattern = /^.*\.([tj])sx?$/;
    if (!context.filename.match(pattern)) return;

    const { header } = getFileHeader(context, node);
    if (!header) {
        context.report({
            node,
            messageId: 'missingLicenseNotice',
            data: {
                license,
                copyRightYear,
                copyRightName
            },
            fix: (fixer) => {
                return fixer.insertTextBefore(
                    node,
                    generateLicenseHeader({
                        license,
                        copyRightYear,
                        copyRightName
                    })
                );
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
