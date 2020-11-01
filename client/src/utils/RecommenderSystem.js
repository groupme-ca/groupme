class Recommender {
    constructor(users) {
        if (users.length != 2) {
            return -1
        }
            
        this.u = users[0];
        this.v = users[1];
    }

    jaccard() {
        const union = new Set();
        this.u.map((item) => { union.add(item); })
        this.v.map((item) => { union.add(item); })

        const j = Array.from(union).length;

        let i = 0;
        const smaller = this.u.length > this.v.length ? this.v : this.u;
        smaller.map((_, idx) => {
            if (this.u[idx] === this.v[idx]) {
                i++;
            }
        })

        return 2 * i / j;

    }
}