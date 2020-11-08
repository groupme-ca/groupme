import vlad from '../assets/img/vlad2.svg';
import lara from '../assets/img/lara.svg';
import alick from '../assets/img/alick.svg';

import p1 from '../assets/img/person1.svg';
import p2 from '../assets/img/person2.svg';
import as from '../assets/img/ArtStudent.svg';

const recommendations = {
    hobbies: [
        {name: "Vladimir Chadweeb", avatar: vlad, hobbies:['Anime', 'Gaming'], bio: "I wouldn't want to be my friend tbh"},
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