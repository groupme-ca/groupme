import vlad from '../assets/img/vlad.jpg';
import lara from '../assets/img/lara.jpg';
import alick from '../assets/img/alick.jpg';

import p1 from '../assets/img/person1.jpg';
import p2 from '../assets/img/person2.jpg';
import as from '../assets/img/george.jpg';

import img_default from '../assets/img/default.png'

const recommendations = {
    hobbies: [
        {name: "Vladimir Chadweeb", avatar: vlad, hobbies:['Anime', 'Gaming', 'Gamma Radiation & Chill', 'Anime Onesies', 'NOT people lol'], bio: "I wouldn't want to be my friend tbh"},
        {name: "Alick Professorson", avatar: alick, hobbies:['Anime', 'Professing'], bio: "Professor of Communications and Sociology at the University of Toronto"},
        {name: "Loretta B.", avatar: p1, hobbies:['Gaming', 'Reading'], bio: "Student Leader at someStudentAssocOrSmtg"},
        {name: "Jordan P.", avatar: img_default, hobbies:['Reading'], bio: "I need to get a good profile picture!"},
        {name: "Mike Famli", avatar: p2, hobbies:['Gaming'], bio: "UofT CS 202? | Software Engineer @ GroupMe"},
    ],
    courses: [
        {name: "Lara Ken", avatar: lara, courses:['CSC490', 'CCT110'], bio: "Graphic design is my passion"},
        {name: "George Kensington", avatar: as, courses:['CSC490', 'ART123'], bio: "Art and design is my entire personality"},
    ]
};


export default recommendations;