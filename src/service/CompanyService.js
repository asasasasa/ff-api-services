import HttpClient, {APIMapping} from '../http';

export default class CompanyService {

    static client = new HttpClient(APIMapping.companyService);

    //domain -> can also be an email
    static createCompany(companyName, companyUrl, domain) {
        return CompanyService.client.makeRequestSimple({
            companyName,
            companyUrl,
            domain
        }, '/company', 'POST');
    }

    static usePreset(presets) {
        return CompanyService.client.makeRequestSimple({
            presets
        }, '/company/usepreset', 'PUT');
    }

    static updateCompany(body) {
        return CompanyService.client.makeRequestSimple(body, '/company', 'PUT');
    }

    static findCompany(companyId) {
        return CompanyService.client.makeRequestSimple({}, `/company/${encodeURIComponent(companyId)}`, 'GET');
    }

    static memberCountByEMailAddress(mailaddress) {
        return CompanyService.client.makeRequestSimple({
            mailaddress: mailaddress
        }, '/company/numberOfUsers', 'PUT');
    }

	static postImage(image) {
		const formData = new FormData();
		formData.append('logo', image);
		return this.client.makeRequest('/company/logo', 'POST', formData,
            {headers: {'Content-Type': 'multipart/form-data'}});
	}

    static postTerms(terms) {
        const formData = new FormData();
        formData.append('terms-file', terms);
        return this.client.makeRequest('/company/terms/upload', 'POST', formData,
            {headers: {'Content-Type': 'multipart/form-data'}});
    }

    static removeTerms(fileName) {
        const formData = new FormData();
        formData.append('file-name', fileName);
        return this.client.makeRequest('/company/terms/remove', 'POST', formData);
    }

    static renameTerms(currentName, newName) {
        const formData = new FormData();
        formData.append('current-name', currentName);
        formData.append('new-name', newName);

        return this.client.makeRequest('/company/terms/rename', 'POST', formData);
    }
}

const StatusMapping = {
    create: {
        ALREADY_EXIST: 400,
        MANDANTORY_FIELD_NOT_FILLED: 422,
        INTERNAL_SERVER_ERROR: 500
    },
    findByEmail: {
        NO_COMPANY_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500
    },
    findById: {
        ID_NOT_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500
    }
};

export {
    StatusMapping
};
