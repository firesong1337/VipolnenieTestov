import testsData from './data/TestsData.json';

class TestsModel {
    constructor() {
        this.data = [];
    }
    loadTestsData() {
        this.data = testsData;
        console.log(testsData);
    }
    getTestsData() {
        return this.data;
    }
}
export default TestsModel;