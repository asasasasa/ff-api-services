import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

class WorkflowService extends APIClient {

    constructor() {
        super(APIMapping.workflowService);
    }

    fetchAvailableConditions = async (): Promise<AxiosResponse<String[]>> => {
        return await this.invokeApi('/action/ids', 'GET', undefined, {
            queryParams: {
                type: 'condition'
            }
        });
    };

    fetchAvailableActions = async (): Promise<AxiosResponse<String[]>> => {
        return await this.invokeApi('/action/ids', 'GET', undefined, {
            queryParams: {
                type: 'action'
            }
        });
    };
}

export default new WorkflowService();