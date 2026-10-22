import { logNodeRuntimeVersion } from '../server/node-runtime-version.mjs';

import { createApplication } from '../server/index.mjs'

logNodeRuntimeVersion('hackathon/api/index');

export default createApplication().app
