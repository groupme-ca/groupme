import vlad from '../assets/img/vlad.jpg';
import lara from '../assets/img/lara.jpg';
import alick from '../assets/img/alick.jpg';

import p1 from '../assets/img/person1.jpg';
import p2 from '../assets/img/person2.jpg';
import as from '../assets/img/george.jpg';

const recommendations = {
    hobbies: [
        {name: "Vladimir Chadweeb", avatar: vlad, hobbies:['Anime', 'Gaming', 'Gamma Radiation & Chill', 'Anime Onesies', 'NOT people lol'], bio: "I wouldn't want to be my friend tbh, cos I like my anime onesie more than actual people, and idk what else to put here to make this bio super long so I can test this card stuff"},
        {name: "Alick Professorson", avatar: alick, hobbies:['Anime', 'Professing'], bio: "I'm a professor and I love professing"},
        {name: "Another One ", avatar: p1, hobbies:['Gaming', 'Reading'], bio: "I'm getting tired of writing these"},
        {name: "Another Two ", avatar: p2, hobbies:['Gaming'], bio: "This app better be worth it I stg"},
    ],
    courses: [
        {name: "Lara Ken", avatar: lara, courses:['CSC490', 'CCT110'], bio: "Graphic design is my passion"},
        {name: "George Kensington", avatar: as, courses:['CSC490', 'ART123'], bio: "Art and design is my entire personality"},
    ]
};


export default recommendations;