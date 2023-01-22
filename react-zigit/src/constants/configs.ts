import { defaultConfigs } from "./defaultConfig";

const _prodConfigs = {
    // TODO: Don't forget to return the changes
    serverURL: 'http://localhost:44341/api'
    // serverURL: 'http://10.0.0.1:44341/api'
}

export const configs = { ...defaultConfigs, ..._prodConfigs };