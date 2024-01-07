import axios from 'axios';

const KEUANGAN_API_BASE_URL = "http://localhost:9080/api/reports";

class KeuanganService {

    getKeuangan(){
        return axios.get(KEUANGAN_API_BASE_URL);
    }

    createKeuangan(keuangan){
        return axios.post(KEUANGAN_API_BASE_URL, keuangan);
    }

    getKeuanganById(keuanganId){
        return axios.get(KEUANGAN_API_BASE_URL + '/' + keuanganId);
    }

    updateKeuangan(keuangan, keuanganId){
        return axios.put(KEUANGAN_API_BASE_URL + '/' + keuanganId, keuangan);
    }

    deleteKeuangan(keuanganId){
        return axios.delete(KEUANGAN_API_BASE_URL + '/' + keuanganId);
    }
}

export default new KeuanganService()