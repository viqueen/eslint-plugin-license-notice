import { includeRule } from './include-rule';

const licenseNotice = includeRule();

const rules = {
    [licenseNotice.key]: licenseNotice.rule
};

export { rules };
