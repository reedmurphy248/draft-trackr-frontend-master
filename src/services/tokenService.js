function getAuthHeader() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const token = userInfo.data.accessToken;
    const authHeader = { "x-access-token": token };

    return authHeader;
}

export default getAuthHeader;