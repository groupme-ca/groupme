class Recommender {

    constructor(user, users) {
        this.user = {
            hobbies: user.hobbies.map((h) => h.label),
            courses: user.courses.map((c) => c.label)
        };

        this.users = [];
        users.forEach((usr) => {
            if (usr.email === user.email) 
                return;

            this.users.push({
                ...usr,
                hobbies: usr.hobbies.map((h) => h.label),
                courses: usr.courses.map((c) => c.label)
            })
        })

        this.courseMap = new Map();
        this.hobbiesMap = new Map();

        return;
    }

    similarityScore(u, v, _map) {
        u.forEach((entry) => _map.set(entry, entry));

        let count = 0;
        for (let i = 0; i < v.length; i ++) {
            let entry = v[i];
            if (_map.has(entry)) 
                count += 1;
        }

        return Math.round(100 * count / ((u.length + v.length)/2));
    }

    matchHobbies(vHobbies) {
        const uHobbies = this.user.hobbies;
        return this.similarityScore(uHobbies, vHobbies, this.hobbiesMap);
    }

    matchCourses(vCourses) {
        const uCourses = this.user.courses;
        return this.similarityScore(uCourses, vCourses, this.courseMap);
    }

    generateRecommendations(idx) {
        if (idx === 'hobbies') {
            const hobbies = [];
            this.users.forEach((usr) => {
                const rScore = this.matchHobbies(usr.hobbies);
                if (rScore) hobbies.push({
                    ...usr,
                    rScore
                })
            })

            hobbies.sort((a,b) => (a.rScore < b.rScore) ? 1 : ((b.rScore < a.rScore) ? -1 : 0));
            return hobbies;
        }

        else if (idx === 'courses') {
            const courses = [];
            this.users.forEach((usr) => {
                const rScore = this.matchCourses(usr.courses);
                if (rScore) courses.push({
                    ...usr,
                    rScore
                })
            })

            courses.sort((a,b) => (a.rScore < b.rScore) ? 1 : ((b.rScore < a.rScore) ? -1 : 0));
            return courses;
        }
    }
}

export default Recommender;