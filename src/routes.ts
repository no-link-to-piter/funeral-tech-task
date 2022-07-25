type RouteId = string | number;

export const routes = {
    login: "/login",
    logout: "/logout",
    home: "/",
    company: (companyId: RouteId = ":companyId") => `/company/${companyId}`,
}