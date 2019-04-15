module.exports = {
    preset: "ts-jest/presets/js-with-ts",
    testEnvironment: "node",
    globals: {
        _address: 'http://localhost:3001',
        _auth: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.rO9a-V0jqkiJgGX8Uvzv3vcI7c1IUBtkcC055euSO8U'
    }
}