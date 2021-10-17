import fetch from "cross-fetch";

export class Anime {
    token: string;
    baseUrl: URL;

    constructor(token: string) {
        this.token = "Mutual " + token;
        this.baseUrl = new URL("https://anirate.herokuapp.com/api/");
    }

    async getById(id: string, option?: string) {
        try {
            let url = new URL(
                this.baseUrl.toString() + `anime/${id}/${option}`
            );
            let res = await fetch(url.toString(), {
                headers: { Authorization: this.token },
            });
            let data = await res.json();

            if (res.status >= 400 || data.error === true) {
                throw new Error(data.message);
            }

            return data.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getByTitle(title: string, userId?: string) {
        try {
            let url = new URL(this.baseUrl.toString() + "anime/search?");
            let params = new URLSearchParams(url.search);
            params.append("query", title);
            if (userId) {
                params.append("user", userId);
            }
            let res = await fetch(url.toString() + params.toString(), {
                headers: { Authorization: this.token },
            });
            let data = await res.json();

            if (res.status >= 400 || data.error === true) {
                throw new Error(data.message);
            }

            return data.data;
        } catch (err) {
            console.error(err);
        }
    }

    async submit(
        animeId: string,
        userId: string,
        episode: string,
        score: number
    ) {
        try {
            let url = new URL(
                this.baseUrl.toString() + `anime/${animeId}/${episode}/vote`
            );
            let body = {
                user: userId,
                score: score,
            };
            let res = await fetch(url.toString(), {
                method: "PUT",
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(body),
            });

            let data = await res.json();

            if (res.status >= 400 || data.error === true) {
                throw new Error(data.message);
            }

            try {
                await this.follow(animeId, userId, "add");
            } catch (err) {}

            return data.data;
        } catch (err) {
            console.error(err);
        }
    }

    async follow(animeId: string, userId: string, option: "remove" | "add") {
        try {
            let method = "PUT";
            if (option == "remove") {
                let method = "DELETE";
            }
            let url = new URL(
                this.baseUrl.toString() + `anime/${animeId}/follow`
            );
            let body = { user: userId };
            let res = await fetch(url.toString(), {
                method: method,
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            let data = await res.json();
            if (res.status >= 400 || data.error === true) {
                throw new Error(data.message);
            }
            return data.data;
        } catch (err) {
            console.error(err);
        }
    }
}