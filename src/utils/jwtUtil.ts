import {refreshJWT} from "../api/api";

export function jwtUtil() {
    let refreshIntervalId: NodeJS.Timeout;

    const scheduleRefresh = (refreshToken: string) => {
        // Clear any existing interval to avoid setting multiple intervals
        if (refreshIntervalId) {
            clearInterval(refreshIntervalId);
        }

        refreshIntervalId = setInterval(() => {
            console.log("Refreshing token...");
            refreshJWT().then((data) => {
                // If a new refresh token is provided, reschedule with it
                if (data.refresh_token) {
                    scheduleRefresh(data.refresh_token);
                }
            }).catch((error) => {
                // Handle refresh failure (e.g., log out the user)
                window.location.href = '/login';
                clearInterval(refreshIntervalId);
            });
        }, 300000); // Refresh every 5 minutes
    }

    const clearRefresh = () => {
        if (refreshIntervalId) {
            clearInterval(refreshIntervalId);
        }
    }

    return {
        scheduleRefresh,
        clearRefresh,
    };
}
