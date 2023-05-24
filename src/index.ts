import { licenseNoticeRule } from './license-notice-rule';

const licenseNotice = licenseNoticeRule();

const rules = {
    [licenseNotice.key]: licenseNotice.rule
};

export { rules };
