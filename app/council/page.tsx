"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SectionItem {
  name: string;
  role?: string;
  photo?: string; // absolute path under /public
  biography?: string;
  gallery?: string[];
}
interface Section {
  title: string;
  items: SectionItem[];
}

interface ModalData {
  name: string;
  role: string;
  photo: string;
  biography: string;
  gallery: string[];
}

const photo = (file: string | undefined) => (file ? `/images/council/${file}` : '/logos/lion.png');

const sections: Section[] = [
  // New top section with placeholders for Lions District 306 D7
  {
    title: 'Lions District 306 D7',
    items: [
      { 
        role: 'District Governor', 
        name: 'Lion Gaya Upasena PMJF PMAF', 
        photo: photo('gaya.jpeg'),
        biography: `
          <p><strong>Lion Gaya Upasena PMJF PMAF</strong> serves as the District Governor of Lions District 306 D7, embodying exceptional leadership and technical expertise in service to humanity.</p>

          <p><strong>Early Life & Education</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Born in <strong>Maharagama</strong></li>
            <li>Exceptional former student at <strong>Dharmapala College</strong> and <strong>Nalanda College, Colombo</strong></li>
            <li><strong>Diploma in Automobile Engineering</strong> – Ceylon German Technical Training Institute</li>
            <li>Served as <strong>Lecturer/Demonstrator</strong> at Ceylon German Technical Training Institute</li>
            <li><strong>Member</strong> – Institute of Motor Engineering, United Kingdom</li>
          </ul>

          <p><strong>Professional Excellence</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Acclaimed <strong>Specialist in Power Generation</strong></li>
            <li><strong>10 years of remarkable service</strong> at the <strong>Ministry of Defense, Sultanate of Oman</strong></li>
            <li><strong>30 years of experience</strong> at leading Power Generation companies in Sri Lanka</li>
            <li>Progressive positions: <strong>Service Engineer</strong>, <strong>Service Manager</strong>, and <strong>Director</strong></li>
            <li><strong>Technical Managing Director & Consultant</strong> for world-renowned Power Generator brand <strong>FG Wilson</strong> since 2010</li>
          </ul>

          <p><strong>International Expertise</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Participated in numerous conferences and training programs for <strong>FG Wilson Dealers worldwide</strong></li>
            <li>International training locations:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li className="text-gray-800 dark:text-gray-200"><strong>United Kingdom</strong> (2 times)</li>
                <li className="text-gray-800 dark:text-gray-200"><strong>Singapore</strong> (6 times)</li>
                <li className="text-gray-800 dark:text-gray-200"><strong>Vietnam</strong>, <strong>India</strong>, and <strong>Macau</strong></li>
              </ul>
            </li>
            <li><strong>Renowned Visiting Lecturer</strong> registered at Skill Development Authority, Vocational Training Authority, and R H Training Institute</li>
            <li>Conducts comprehensive training programs for students, professionals, and electrical/mechanical community members</li>
          </ul>

          <p><strong>Business Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Founder Member</strong> – BNI Inspire Chapter of Sri Lanka (since 2018)</li>
            <li><strong>Supporting Director Consultant</strong> – Business Network International (BNI)</li>
          </ul>

          <p><strong>Lions Journey & Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Joined <strong>Lions International in 2012</strong> as charter member of <strong>Lions Club of Udahamulla Metro</strong></li>
            <li>Currently a member of <strong>Lions Club of Pannipitiya Paradise</strong></li>
            <li>Held numerous positions:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li className="text-gray-800 dark:text-gray-200"><strong>Club President</strong>, <strong>Club Secretary</strong>, <strong>Club Treasurer</strong></li>
                <li className="text-gray-800 dark:text-gray-200"><strong>Zone Chairperson</strong>, <strong>Region Chairperson</strong>, <strong>Region GLT Coordinator</strong></li>
                <li className="text-gray-800 dark:text-gray-200"><strong>Region Secretary</strong>, <strong>Additional Cabinet Secretary</strong></li>
                <li className="text-gray-800 dark:text-gray-200"><strong>Chairperson of Club Performance & Evaluation</strong></li>
                <li className="text-gray-800 dark:text-gray-200"><strong>District IT Chairperson</strong> & <strong>Cabinet Secretary</strong></li>
              </ul>
            </li>
          </ul>

          <p><strong>Awards & Recognition</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Most Outstanding Zone Chairperson</strong></li>
            <li><strong>Most Outstanding Region Chairperson</strong></li>
            <li><strong>Most Innovative Lion</strong></li>
            <li><strong>Most Popular Lion</strong></li>
            <li><strong>Most Supportive Lion</strong></li>
            <li><strong>Most Dedicated Lion</strong></li>
            <li><strong>Progressive Melvin Jones Fellow (PMJF)</strong></li>
            <li><strong>Progressive Member of the Academy of Fellows (PMAF)</strong></li>
          </ul>

          <p><strong>Innovation & Technology Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Mastermind behind the development of <strong>District Website</strong></li>
            <li>Created <strong>Mobile App</strong> and <strong>online evaluation system</strong></li>
          </ul>

          <p><strong>District Governor Achievements (2024-2025)</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>As <strong>First Vice District Governor</strong>, extended <strong>two new Lions Clubs</strong></li>
            <li>Received <strong>Two Club Challenge International President's Medal</strong></li>
            <li>His club sponsored <strong>two Leo Clubs</strong></li>
            <li>Vision: <strong>"Building a Better Future Together"</strong></li>
          </ul>

          <p><strong>Family</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Married to <strong>Lion Rasika Upasena</strong>, former student of <strong>Anula Vidyalaya - Nugegoda</strong></li>
            <li>Wife is a <strong>retired Government Official</strong> and <strong>Director at Power Lanka Pvt Ltd</strong></li>
            <li>Daughter <strong>Dinithi</strong> – Confidential Secretary; Bachelor's and Master's degrees from Amazon College</li>
            <li>Daughter <strong>Thilini</strong> – Business Development; Bachelor's degree in International Business Management from NSBM</li>
            <li>Son <strong>Gimantha</strong> – Honors Degree in Bachelor of Engineering at Monash University Malaysia; Master's degree in Mathematics at University of New Brunswick, Canada; currently pursuing PhD in Electrical Engineering at the same university</li>
          </ul>

          <p><strong>Legacy</strong></p>
          <p>Lion Gaya Upasena exemplifies the perfect blend of technical excellence, business acumen, and humanitarian service—a true leader building bridges between innovation and compassion.</p>
        `,
        gallery: [
          '/images/gaya/gaya1.jpg',
          '/images/gaya/gaya2.jpg',
          '/images/gaya/gaya3.jpg',
          '/images/gaya/gaya4.jpg',
          '/images/gaya/gaya5.jpg'
        ]
      },
      { 
        role: 'Immediate Past District Governor', 
        name: 'Lion Ranjith Fernando PMJF PMAF', 
        photo: photo('ranjith.jpg'),
        biography: `
          <p><strong>Lion Ranjith Fernando</strong> embodies a rare synergy of professional excellence, entrepreneurial vision, and service-driven leadership.</p>

          <p><strong>Professional Journey</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Early career in banking; instrumental in establishing the <strong>Leasing Unit at People’s Bank</strong></li>
            <li>Served as <strong>Branch Manager</strong> at <strong>Seylan Bank</strong></li>
            <li>Expanded into entrepreneurship; built a successful footprint in the <strong>printing and packaging industry</strong></li>
          </ul>

          <p><strong>Academic & Credentials</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Bachelor of Commerce</strong> – University of Sri Jayewardenepura</li>
            <li><strong>Associate Member</strong> – Institute of Bankers</li>
            <li><strong>Finalist</strong> – Institute of Chartered Accountants of Sri Lanka</li>
            <li>Advanced studies in <strong>Japan</strong> and <strong>India</strong></li>
            <li>Led <strong>MASCO 85</strong> of his alma mater with distinction</li>
          </ul>

          <p><strong>Industry Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>President</strong> – Sri Lanka Association of Printers</li>
            <li>Represented Sri Lanka at international platforms including the <strong>Export Development Board (EDB)</strong> and the <strong>Federation of Asia Print</strong></li>
          </ul>

          <p><strong>Lionism & Thought Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Rose through the ranks with unwavering dedication; crowned <strong>Most Outstanding Club President (2008)</strong></li>
            <li>Served in numerous cabinet roles</li>
            <li>Authored <strong>four publications</strong> on leadership and Lions governance</li>
            <li>Recipient of the prestigious <strong>Leadership Medal</strong> from International President <strong>Douglas Alexander</strong></li>
          </ul>

          <p><strong>District Governor (2024/25) – “Together We Smile”</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Spearheaded a <strong>Rs. 40 million state-of-the-art Dialysis Center</strong> at <strong>KDU Hospital</strong> in partnership with <strong>LCIF</strong> and local funding</li>
            <li>Led District 306C2 to global recognition:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li><strong>Membership Hero Award</strong></li>
                <li><strong>Membership Rockstar Award</strong> at the <strong>2025 International Convention (USA)</strong></li>
                <li><strong>Kindness Matters Award</strong> – bestowed upon only <strong>30 districts worldwide</strong></li>
              </ul>
            </li>
          </ul>

          <p><strong>Beyond Lionism</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Published author and visiting lecturer</li>
            <li>Polymath with passions spanning <strong>IT</strong>, <strong>AI</strong>, <strong>painting</strong>, <strong>music</strong>, and <strong>photography</strong></li>
          </ul>

          <p><strong>Family</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Married to <strong>Lion Lady Sriyani</strong></li>
            <li>Father to two accomplished daughters: <strong>Anupama</strong> and <strong>Sewwandi</strong></li>
          </ul>

          <p><strong>Current Roles</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Immediate Past District Governor</strong> – 306C2</li>
            <li><strong>Multiple Council Secretary</strong> – MD 306</li>
          </ul>

          <p>He exemplifies what it means to be a leader—in service, profession, and life.</p>
        `,
        gallery: [
          '/images/ranjith/ranjith1.jpg',
          '/images/ranjith/ranjith2.jpg',
          '/images/ranjith/ranjith3.jpg',
          '/images/ranjith/ranjith4.jpg',
          '/images/ranjith/ranjith5.jpg'
        ]
      },
      { 
        role: 'First Vice District Governor', 
        name: 'Lion Chandika Dedigama PMJF', 
        photo: photo('chandika.jpeg')
      },
      { 
        role: 'Second Vice District Governor', 
        name: 'Lion Viduranga Maddumage', 
        photo: photo('viduranga.jpg')
      },
      { 
        role: 'Cabinet Secretary', 
        name: 'Lion Chandana Mahanama', 
        photo: photo('chandana.jpeg')
      },
      { 
        role: 'Cabinet Treasurer', 
        name: 'Lion Upul Punchihewa', 
        photo: photo('upul.jpeg')
      },
    ],
  },
  {
    title: 'District Executives',
    items: [
      { 
        role: 'District President', 
        name: 'Leo Lion Hansathi Imethma', 
        photo: photo('hansathi.jpg'),
        biography: `
          <p><strong>Leo Lion Hansathi Imethma</strong> was born in <strong>2002</strong> to Mr. Manjula Gallage and Mrs. Sasika Nilani, as the eldest sister to two brothers. From a young age, she displayed a natural inclination toward leadership and community service, guided by a strong sense of empathy and a desire to make a positive impact. This passion shaped her academic and extracurricular journey, where she excelled both in studies and in diverse activities.</p>

          <p><strong>Education & School Achievements</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Proud alumna of <strong>Asian Grammar School</strong></li>
            <li>Achieved the <strong>best O/L results</strong> in her batch; completed <strong>A/Ls in Physical Science</strong></li>
            <li>Active member of the <strong>Eastern Band</strong>, <strong>MUN Club</strong>, <strong>Netball Team</strong>, <strong>Swimming Squad</strong>, and <strong>Senior Dancing Troupe</strong></li>
            <li>Awarded the <strong>Pahin Patha</strong> milestone as a traditional dancer</li>
            <li>Named <strong>Most Outstanding Student</strong> for <strong>two consecutive years</strong></li>
            <li>Served as a <strong>Prefect for four years</strong> and <strong>Head Prefect (2020/21)</strong></li>
          </ul>

          <p><strong>Higher Education & Professional Career</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Undergraduate at the <strong>Institute of Chemistry Ceylon</strong></li>
            <li>Plays for the university <strong>basketball team</strong></li>
            <li>Served as <strong>Junior Secretary</strong> of the Student’s Association (2024/25)</li>
            <li><strong>Head of Business Operations</strong> at <strong>Angel Products</strong>, a leading bedding supplier in Sri Lanka</li>
          </ul>

          <p><strong>Leo Movement Journey</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Charter Member of the <strong>Leo Club of Asian Grammar School</strong> (2016/17)</li>
            <li>Club roles:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li><strong>Club Secretary</strong> (2017/18)</li>
                <li><strong>Club Vice President</strong> (2018/19)</li>
                <li><strong>4th Club President</strong> (2019/20)</li>
              </ul>
            </li>
            <li>As Club President, coordinated <strong>30+ large-scale projects and fundraisers</strong>, including <em>AGS Winds Kite Festival</em> and <em>Literacy Academy</em></li>
            <li>Later joined the <strong>Leo Club of Pannipitiya Metro Titans</strong> and served as <strong>Club Secretary (2022/23)</strong></li>
          </ul>

          <p><strong>District-Level Leadership (Leo District 306 C2)</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Regional Director</strong></li>
            <li><strong>District Assistant Secretary</strong></li>
            <li><strong>District Secretary</strong></li>
            <li><strong>District Vice President</strong></li>
            <li>Key contributions:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li><strong>Project Secretary</strong> of <em>C2 Games 2020</em></li>
                <li><strong>Organizer</strong> of the <em>Exodia 2021</em> Regional Orientation Series</li>
                <li><strong>Project Chairman</strong> of the <em>19th Annual Leo District Conference (2023/24)</em></li>
                <li><strong>Co-Chairman</strong> of <em>Battle of C’s 2025</em></li>
              </ul>
            </li>
          </ul>

          <p><strong>Multiple District 306 Sri Lanka & Maldives</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Served as a <strong>Multiple Council Officer</strong></li>
            <li>Contributions:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li><strong>Project Secretary</strong> of the <em>Leo Multiple District Conference (2021/22)</em></li>
                <li><strong>Project Secretary</strong> of the <em>Leo Multiple District Walk (2022)</em></li>
                <li><strong>Co-Chairman</strong> of <em>Leo Multiple Service Week</em> and <em>Leo Day Celebrations (2024)</em></li>
              </ul>
            </li>
          </ul>

          <p><strong>Lions Movement</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Helped charter the <strong>Leo Lions Club of Colombo Uptown Legends (2023/24)</strong></li>
            <li>Elected as <strong>1st Vice President</strong> (2023/24)</li>
            <li>Served as <strong>Club Director</strong> and <strong>Lions District Cabinet Member</strong> (2024/25)</li>
          </ul>

          <p><strong>Awards & Recognitions</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>International President’s Appreciation Certificates</strong></li>
            <li><strong>Top 10 Leo Awards</strong> – Leo District 306 C2</li>
            <li><strong>District Governor’s Appreciation Awards</strong></li>
            <li><strong>District President’s Appreciation Awards</strong></li>
            <li><strong>Most Outstanding Regional Director Award</strong></li>
            <li><strong>Most Outstanding Council Officer Award</strong></li>
            <li><strong>Leo of the Year</strong> at District, Multiple District, and <strong>International</strong> levels (2024/25)</li>
          </ul>

          <p><strong>Inspiration</strong></p>
          <p>Leo Lion Hansathi Imethma’s story is one of <strong>dedication</strong>, <strong>resilience</strong>, and <strong>unwavering commitment</strong>. Her journey stands as an inspiration to many, embodying the true spirit of leadership, service, and excellence.</p>
        `,
        gallery: [
          '/images/hansathi/hansathi1.JPG',
          '/images/hansathi/hansathi2.JPEG',
          '/images/hansathi/hansathi3.JPG',
          '/images/hansathi/hansathi4.JPG',
          '/images/hansathi/hansathi5.JPG',
          '/images/hansathi/hansathi6.jpeg',
          '/images/hansathi/hansathi7.jpg',
          '/images/hansathi/hansathi8.jpg',
          '/images/hansathi/hansathi9.JPG',
          '/images/hansathi/hansathi10.JPG',
          '/images/hansathi/hansathi11.JPG',
          '/images/hansathi/hansathi12.JPG'
        ]
      },
      { 
        role: 'Immediate Past District President / District Contest Director', 
        name: 'Leo Lion Sunera Naveed', 
        photo: photo('naveed.jpg'),
        biography: `
          <p><strong>Leo Lion Sunera Naveed</strong>, a prominent alumnus of <strong>Ananda College, Colombo 10</strong>, is the only child of Mr. Lasantha Prasad Lokupitiya and Mrs. Hasithri Yaswanthi Rodrigo. His journey is defined by leadership, innovation, and unwavering dedication to service.</p>

          <p><strong>School Achievements & Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Colors' man</strong>, skilled <strong>hockey goalie</strong>, and <strong>Deputy Head Prefect</strong></li>
            <li><strong>President Scout</strong> and <strong>national-level hockey player</strong> with multiple awards</li>
            <li>Held key positions:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li>Assistant Secretary – Interact Club</li>
                <li>Editor – Astronomical Association</li>
                <li>Media Coordinator – Young Inventors Society</li>
                <li>Editor – Aeronautical Academy</li>
                <li>Head of Media – ACMUN 2017 & 2018</li>
                <li>Lead Organiser – Ananda Dalada Society</li>
                <li>Treasurer – Ananda College Wall of Humanity</li>
              </ul>
            </li>
            <li>Also a young inventor and guitarist</li>
            <li>Represented Interact District Sri Lanka & Maldives at <em>Act Asia 2017</em> in Nepal</li>
          </ul>

          <p><strong>Early Leo Journey</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Joined the <strong>Leo Club of Ananda College</strong> to serve the community</li>
            <li>Rose through the ranks to <strong>Director</strong> and <strong>Club President (2018/19)</strong></li>
            <li>Chairperson of <em>Project Wilpattu</em> – won <strong>Most Outstanding Environment Project</strong></li>
            <li>Under his leadership, the club secured <strong>12 honours</strong>, including <em>1st Runner-Up – Most Outstanding School-based Leo Club</em></li>
            <li>Also served as Media Head – <em>Sri Lanka Crisis Simulation</em> and Director – <em>Rotaract Club of Centennial United</em></li>
          </ul>

          <p><strong>Expanding Service & Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Elected <strong>Charter Vice President</strong> of the first-ever <strong>Leo Lions Club of Ananda Alumni</strong> (2020/21)</li>
            <li>Joined the <strong>Nawala Metro Leo Club</strong> to continue impactful community work</li>
            <li>Held positions: <strong>Club Treasurer</strong>, <strong>District Membership Officer</strong>, and <strong>Treasurer of “Manudam”</strong></li>
            <li>Awards: <strong>Most Disciplined Leo</strong> and <strong>1st Runner-Up – Most Outstanding Club Treasurer</strong></li>
            <li>Elected <strong>Club President – Leo Club of Nawala Metro (2021/22)</strong>
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li>Achievements: <strong>Most Outstanding Leo Club</strong>, <strong>Most Outstanding Leo Club President</strong>, <strong>Excellence Award</strong>, and <strong>33+ club awards</strong></li>
                <li>Also elected <strong>Club Vice President – Leo Lions Club of Ananda Alumni</strong></li>
              </ul>
            </li>
            <li>As <strong>Immediate Past President (2022/23)</strong>, received <strong>1st Runner-Up – Most Outstanding Immediate Past President</strong></li>
          </ul>

          <p><strong>District, Multiple District & International</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>District Treasurer – Leo District 306 C2 (2023/24)</strong></li>
            <li><strong>Co-Chair</strong> – <em>Mass Induction '23</em> of Leo Multiple District 306 (1,500 inductees)</li>
            <li>Represented Sri Lanka & Maldives – <strong>Leo ISAAME Forum 2023 (Bangladesh)</strong></li>
            <li>Captained House <strong>“Ernest”</strong> at <em>C2 Games</em> – won <strong>overall championship</strong></li>
            <li>Charter Club President – <strong>Leo Lions Club of Colombo Uptown Legends</strong>, enabling Leos to transition to Lions</li>
            <li>Recognized among the <strong>Top 30 Leos</strong> – Leo District 306 C2</li>
            <li>Awards: <strong>International President Appreciation</strong>, <strong>District Governor’s Appreciation</strong>, <strong>5 Years of Leoism</strong></li>
            <li>Completed <strong>District Lions Leadership Institute (DLLI)</strong>; supported <strong>Presidential LCIF</strong></li>
            <li>Honoured with <strong>Leo of the Year</strong> – the highest lifetime recognition for a Leo</li>
          </ul>

          <p><strong>Professional & Entrepreneurship</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Head of Marketing</strong> – East Gate (Pvt) Ltd</li>
            <li>Founded startups: <em>Xfinity.Ik</em> (online courses), <em>NAVE8</em>, <em>Infernation</em> (creative content & events), and <em>Mighty Bigfoot</em> (computer shop)</li>
          </ul>

          <p><strong>Role</strong>: Immediate Past District President</p>
          <p>His journey showcases unwavering devotion to leadership, creativity, and community impact—blending academic excellence, entrepreneurship, and service.</p>
        `,
        gallery: [
          '/images/naveed/naveed1.jpg',
          '/images/naveed/naveed2.jpg',
          '/images/naveed/naveed3.jpg',
          '/images/naveed/naveed4.jpg',
          '/images/naveed/naveed5.jpg'
        ]
      },
      { 
        role: 'District Leo Club Chairperson', 
        name: 'Leo Lion Rahul Attanayake', 
        photo: photo('rahul.jpg'),
        biography: `
          <p><em>“Innovation is seeing what everybody has seen and thinking what nobody has thought.”</em> This quote reflects the journey of <strong>Leo Lion Rahul Attanayake PFLM</strong>, widely regarded as one of the most innovative Leos in the history of Leoism in Sri Lanka.</p>

          <p><strong>Early Life & Education</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Only son with two elder sisters to Mr. D.R. Attanayake and Mrs. Rohini Attanayake</li>
            <li>Completed primary and secondary education at <strong>Lyceum International School, Nugegoda</strong> (Cambridge curriculum)</li>
          </ul>

          <p><strong>Sports & Achievements</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Two-time National Champion</strong> in <em>Wushu (Sanshou)</em> – 2014 & 2015</li>
            <li>Holds the <strong>national record for the fastest knockout (2 seconds)</strong></li>
            <li>Qualified <strong>Wushu referee</strong></li>
          </ul>

          <p><strong>Professional & Academic Path</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Youngest <strong>Alternate Channel Manager</strong> at <strong>Softlogic Life PLC</strong>, heading the <em>BOC Endowment Team</em></li>
            <li>Graduate in Business – <strong>University of Glyndwr, UK</strong></li>
            <li>Postgraduate qualifications:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li><strong>MSc in Strategic Marketing</strong> – Asia E University</li>
                <li><strong>MBA in General Management</strong> – University of Bedfordshire</li>
                <li><strong>MSc in Business Psychology</strong> – University of Northampton</li>
              </ul>
            </li>
            <li>Certified <strong>Life Coach</strong> and <strong>Workshop Facilitator</strong></li>
          </ul>

          <p><strong>Leo Journey & Iconic Projects</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Joined the <strong>Leo Club of Kottawa Central Golden City</strong> (2013); served as <strong>Club President (2016/17)</strong></li>
            <li>Introduced groundbreaking projects:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li><em>Henanigalata Mangachchamu</em></li>
                <li><em>Maayam 64+</em></li>
                <li><strong>Centennial Soccer League</strong> – Sri Lanka’s largest Leo Club sports event for 3 consecutive years; won <em>Best Sports & Recreation Project</em> at Multiple District level</li>
                <li><em>Viru Karuna</em> – carried war heroes to the peak of Sri Pada</li>
                <li><em>Nodutu Manaya</em> – interfaith religious chanting program at Borella Cemetery</li>
              </ul>
            </li>
            <li>Awards: <strong>Leo of the Year – Leo District 306 C2</strong>, <strong>Most Outstanding Leo Executive – MD306 (2018/19)</strong>, <strong>Leo Scholar Award – 2019/20</strong></li>
            <li>Delegate – <strong>1st-ever Leo ISAAME Forum 2016</strong> (Sri Lanka)</li>
          </ul>

          <p><strong>District & Multiple District Leadership</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Roles: <strong>District Coordinator – Youth Empowerment</strong>, <strong>District Treasurer</strong>, <strong>District Vice President</strong>, <strong>16th District President (2020/21)</strong></li>
            <li>As District President (theme: <em>“Finding Yourself through Serving”</em>):
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li>Extended <strong>8 new Leo Clubs</strong> (4 Alpha, 4 Omega)</li>
                <li>Reactivated <strong>6 clubs</strong> – total <strong>31 active clubs</strong></li>
                <li>Achieved <strong>215% net membership growth</strong></li>
                <li>Completed all district events despite the pandemic</li>
              </ul>
            </li>
            <li>Introduced landmark initiatives:
              <ul className="list-disc pl-5 mt-1 text-gray-800 dark:text-gray-200">
                <li>Leader’s Outing Eka</li>
                <li>Clash of Zones</li>
                <li>C2 Legends</li>
                <li><strong>C2 Games Colombo 2020</strong> – mega inter-house event including aquatic and track & field</li>
                <li><strong>Battle of C’s Cricket</strong> – inter-district (with Leo District 306 C1)</li>
                <li><strong>Urban Adventures Leo Youth Camp</strong> – largest in Sri Lanka (170+ participants)</li>
                <li><strong>Manudam</strong> – humanitarian mega project</li>
                <li><strong>KPI Reporting System</strong> for district operations</li>
                <li><strong>Life & Hospitalization Cover</strong> – first-ever insurance for a Leo District Council globally</li>
              </ul>
            </li>
            <li>At the <strong>44th Annual Leo District Conference</strong>, Leo District 306 C2 won <strong>4 Winner Awards</strong> and <strong>1 Runner-Up Award</strong> at Multiple District level</li>
            <li>Elected <strong>Multiple District Vice President (2021/22)</strong> and <strong>45th Multiple District President (2022/23)</strong> – Leo Multiple District 306 Sri Lanka</li>
          </ul>

          <p><strong>Multiple District Presidency Highlights</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Introduced the <strong>FLM/PFLM Trust Program</strong> – grants for clubs, districts, and MD</li>
            <li>Extended the <strong>first-ever Leo Club in the Maldives</strong> – a historic milestone</li>
            <li>Oversaw the extension of <strong>35 new Leo Clubs</strong>, surpassing Lions MD306 membership</li>
            <li>Rebranded and elevated the image of Leoism in Sri Lanka & Maldives</li>
            <li>Conducted all MD events at a grand and innovative scale</li>
            <li>Currently serves as <strong>District Leo Club Chairperson – Leo District 306 D7</strong></li>
          </ul>

          <p><strong>Legacy</strong></p>
          <p>Rahul’s story is one of <strong>resilience</strong>, <strong>innovation</strong>, and <strong>transformational leadership</strong>. From record-breaking athlete to national leader, he has inspired thousands—proving that with vision and passion, the impossible becomes possible.</p>
          <p><strong>Role</strong>: District Leo Club Chairperson</p>
        `,
        gallery: [
          '/images/rahul/rahul1.jpg',
          '/images/rahul/rahul2.jpg',
          '/images/rahul/rahul3.jpg',
          '/images/rahul/rahul4.jpg',
          '/images/rahul/rahul5.jpg'
        ]
      },
      { 
        role: 'District Vice President', 
        name: 'Leo Lion Senura Battage', 
        photo: photo('senura.jpeg'),
        biography: `
          <p><strong>Leo Lion Senura Battage</strong> exemplifies the perfect blend of academic excellence, technological innovation, and service-driven leadership. His journey from a multi-talented student to a distinguished professional and Leo leader showcases unwavering dedication to excellence and community impact.</p>

          <p><strong>Early Life & Education</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Son of <strong>Major Kumara Battage</strong> and <strong>Mrs. Nilanga Patabendi</strong></li>
            <li>Educated at <strong>Ananda College, Colombo</strong></li>
            <li>Balanced academics, sports, and leadership from an early age</li>
          </ul>

          <p><strong>Sports Achievements</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Represented <strong>CR & FC U16 Rugby Team</strong> at age 15</li>
            <li>Earned <strong>Brown Belt in Kyokushin Karate</strong></li>
            <li>Active in <strong>swimming</strong> and <strong>chess</strong></li>
          </ul>

          <p><strong>Leadership Roles in School Societies</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Chief Organiser</strong> – Sinhala Literature Union</li>
            <li><strong>Chief Editor</strong> – Astronomy Association</li>
            <li><strong>Cabinet Minister</strong> – Student Parliament of Ananda College, Colombo</li>
            <li>Active member – Drug Prevention Society, Chess Club, Science Union, Math Club, and more</li>
          </ul>

          <p><strong>University Journey</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Studied <strong>Business Information Systems</strong> at the <strong>University of Westminster</strong> (School of Computer Science & Engineering)</li>
            <li><strong>Graduated with Honours</strong></li>
          </ul>

          <p><strong>Leadership & Community Roles at University</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Rotaractor</strong> (Chaired and Contributed Projects: Women with Wings, Haxmas, Parallax, Ignite, Hotdog Showdown)</li>
            <li><strong>IEEE Student Volunteer</strong></li>
            <li><strong>Treasurer</strong> – Business Computing Society</li>
            <li><strong>Batch Representative</strong> – 2020 Batch</li>
            <li><strong>Student Ambassador</strong></li>
            <li><strong>Alumni Representative</strong></li>
            <li>Represented Sri Lanka at the <strong>University of Westminster Computer Science & Engineering Conference in 2024</strong></li>
          </ul>

          <p><strong>Innovation & Competitions</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Winner of Cutting Edge Hackathon Competition</strong> (3 consecutive years – 2020, 2021, 2022)</li>
            <li><strong>Finalist</strong> – Arimac Futurecast Hackathon</li>
            <li><strong>Finalist</strong> – IEEE Young Innovations 2022</li>
          </ul>

          <p><strong>Professional Career</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Project Manager & Software Engineering Expert</strong></li>
            <li>Experience delivering technology and business solutions globally</li>
            <li>International impact: <strong>Nissan, BYD, Fujita Corporation, QTnet Telecommunication</strong></li>
            <li>Local impact in Sri Lanka: <strong>Commercial Bank, Bank of Ceylon, Lion Brewery, DCSL, Heineken, Melstacorp, LOLC Holdings, Pickme, Port City, Dankotuwa Porcelain, Singer Finance, DIMO</strong></li>
            <li>Passionate about mentoring young leaders and engineers</li>
          </ul>

          <p><strong>Leo Journey – Leadership Through Service</strong></p>
          
          <p><strong>2021</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Club Treasurer</strong> – Leo Club of Homagama Central</li>
            <li><strong>Chairman</strong> – Accelerate Colombo (Most Outstanding Award for Public Relations, Leo District 306 C2)</li>
            <li><strong>Chairman</strong> – Power Hour (1st Runners-Up – Sports and Recreation, Leo District 306 C2)</li>
            <li>Accelerate Colombo - <strong>Most Outstanding Signature Project</strong> – Lions Awards for Leos (Lions District 306 C2)</li>
            <li><strong>1st Runners-Up</strong> – Arogya (Joint Project with Sponsoring Lions Club, Lions District 306 C2)</li>
            <li>Project Athwela – <strong>2nd Runners-Up</strong> (Education and Literacy, Lions District 306 C2)</li>
            <li>Received <strong>5+ project awards</strong> as Project Chairman/Committee member</li>
            <li>Chaired and contributed to <strong>35+ projects</strong></li>
          </ul>

          <p><strong>2022</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li><strong>Vice President</strong> – Leo Club of Homagama Central</li>
            <li>Chaired <strong>Apeksha</strong> (1st Runners-Up – Best Project for Health, Nutrition and Food Safety, Leo District 306 C2)</li>
            <li><strong>Organising Committee Member</strong> – Devils Walk of Leo Multiple 306</li>
            <li><strong>Organising Committee Member</strong> – Crickbash, Leo District 306 C2</li>
            <li>Opened a new Leo Club – <strong>Leo Club of Mahinda Rajapaksha College</strong>, contributed as Treasurer of Leo Club of Homagama Central</li>
            <li>Chaired and contributed to <strong>8+ projects</strong></li>
          </ul>

          <p><strong>2023</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Elected <strong>Club President</strong> – Leo Club of Homagama Central</li>
            <li>Appointed <strong>Director</strong> – Lions Club of Homagama Central</li>
            <li><strong>Organising Committee Member</strong> – Leo Walk, Leo Multiple 306</li>
            <li>Recognised as one of the <strong>Top 30 Leos of Leo District 306 C2</strong></li>
            <li>Recognised as one of the <strong>Top 10 Club Presidents</strong></li>
            <li><strong>Vice Captain (House Ernest)</strong> – C2 Games 2024</li>
            <li>Contributed to <strong>15+ projects</strong>, including 2 international projects</li>
            <li>Received <strong>12+ awards</strong></li>
          </ul>

          <p><strong>2024</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Appointed <strong>Region Chairperson of Region 3</strong> – Leo District 306 C2</li>
            <li>Appointed <strong>Director</strong> – Leo Club of Homagama Central</li>
            <li>Recognised as one of the <strong>Top 30 Leos of Leo District 306 C2</strong></li>
            <li><strong>Chairman</strong> – The Final Flame, C2 Games 2025</li>
            <li>Initiated <strong>Region Orientation Programs</strong> on behalf of the Leo District 306 C2</li>
          </ul>

          <p><strong>2025</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>Elected <strong>Charter District Vice President</strong> – Leo District 306 D7</li>
            <li>Serving as <strong>GMT Coordinator</strong> – Leo Lions Club of Uptown Legends</li>
          </ul>

          <p><strong>My Purpose</strong></p>
          <p>Every step of my journey — from classrooms to competitions, from technology to service — carries a singular purpose:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200">
            <li>To lead with vision</li>
            <li>To serve with heart</li>
            <li>To inspire generations to rise higher</li>
          </ul>

          <p><strong>Role</strong>: District Vice President</p>
        `,
        gallery: [
          '/images/senura/senura1.jpeg',
          '/images/senura/senura2.jpeg',
          '/images/senura/senura3.jpeg',
          '/images/senura/senura4.jpeg',
          '/images/senura/senura5.jpeg',
          '/images/senura/senura6.jpeg',
          '/images/senura/senura7.jpeg',
          '/images/senura/senura8.jpeg',
          '/images/senura/senura9.jpeg',
          '/images/senura/senura10.jpeg'
        ]
      },
      { role: 'District Secretary', name: 'Leo Lion Vihara Jayaweera', photo: photo('vihara.png') },
      { role: 'District Treasurer', name: 'Leo Lion Tehan Nakandala', photo: photo('tehan.jpg') },
      { role: 'District Additional Secretary / Membership Chairperson', name: 'Leo Indeera Weerasinghe', photo: photo('indeera.JPG') },
      { role: 'District Additional Treasurer', name: 'Leo Minasha Katugampola', photo: photo('minasha.jpg') },
      { role: 'District Assistant Secretary', name: 'Leo Lion Yohani Gunathilaka', photo: photo('yohani.jpg') },
      { role: 'District Assistant Treasurer', name: 'Leo Manthila Liyanage', photo: photo('manthila.jpg') },
      { role: 'Leo Lion Liason Officer', name: 'Leo Lion Thavisha Bandara', photo: photo('thavisha.jpeg') },
      // Updated director assignments and titles per request
      { role: 'District Director - Special Programs', name: 'Leo Lion Manthila Gamage', photo: photo('manthilagamage.JPG') },
      { role: 'District Director - Education and Career Guidance', name: 'Leo Lion Poorna Panduwawala', photo: photo('poorna.jpeg') },
      { role: 'District Director - Operations', name: 'Leo Gevindu Kodikara', photo: photo('gevindu.jpeg') },
      { role: 'District Director - Leadership & Professional Development', name: 'Leo Inod Perera', photo: photo('inod.jpeg') },
      { role: 'District Director - Creative Operations', name: 'Leo Lion Didula Fonseka', photo: photo('didula.jpeg') },
    ],
  },
  {
    title: 'Region Directors',
    items: [
      { role: 'Region Chairperson (Region 1)', name: 'Leo Nimsara Manith', photo: photo('nimsara.jpg') },
      { role: 'Region Chairperson (Region 2)', name: 'Leo Lion Gaveen Nayanjith', photo: photo('gaveennayanajith.jpg') },
      { role: 'Region Chairperson (Region 3)', name: 'Leo Thisaruni Wijebandara', photo: photo('thisarani.jpeg') },
      { role: 'Region Chairperson (Region 4)', name: 'Leo Muthula Liyanage', photo: photo('muthula.jpg') },
      { role: 'Region Chairperson (Region 5)', name: 'Leo Ravinya Dimuth', photo: photo('ravinya.jpeg') },
    ],
  },
  {
    title: 'Zone Chairpersons',
    items: [
      { role: 'Zone Chairperson (Region 01 - Zone 01)', name: 'Leo Hiruna Rathnayaka', photo: photo('hiruna.jpg') },
      { role: 'Zone Chairperson (Region 01 - Zone 02)', name: 'Leo Hasanka Lakshan', photo: photo('hansaka.jpeg') },
      { role: 'Zone Chairperson (Region 02 - Zone 01)', name: 'Leo Gaveen Perera', photo: photo('gaveen.jpg') },
      { role: 'Zone Chairperson (Region 02 - Zone 02)', name: 'Leo Rehan Thulnaka', photo: photo('rehan.webp') },
      { role: 'Zone Chairperson (Region 03 - Zone 01)', name: 'Leo Lithira Ramuditha', photo: photo('lithira.jpg') },
      { role: 'Zone Chairperson (Region 03 - Zone 02)', name: 'Leo Lehara Silva', photo: photo('lehara.jpg') },
      { role: 'Zone Chairperson (Region 04 - Zone 01)', name: 'Leo Vihas Santhula', photo: photo('vihas.jpeg') },
      { role: 'Zone Chairperson (Region 04 - Zone 02)', name: 'Leo Navindu Jayawardane', photo: photo('navindu.png') },
      { role: 'Zone Chairperson (Region 05 - Zone 01)', name: 'Leo Udula Satharasinghe', photo: photo('udula.jpg') },
      { role: 'Zone Chairperson (Region 05 - Zone 02)', name: 'Leo Pamudi Anuththara', photo: photo('pamudi.jpg') },
    ],
  },
  {
    title: 'District Coordinators',
    items: [
      { role: 'District Chief Coordinator - Constitution & by laws', name: 'Leo Uvin Windula', photo: photo('uvin.jpg') },
      { role: 'District Chief Coordinator - Lions Global Challenges', name: 'Leo Kavindu Dehiwala', photo: photo('kavindu.JPG') },
      { role: 'District Chief Coordinator - Entertainment and Cultural Affairs', name: 'Leo Chirani Devanga', photo: photo('chirani.jpg') },
      { role: 'District Chief Coordinator - Multiple District Affairs', name: 'Leo Akila Weragoda', photo: photo('akila.jpg') },
    ],
  },
  {
    title: 'District Team Heads',
    items: [
      { role: 'District Team Head - Marketing & Digital Transformations Team', name: 'Leo Malindya Fernando', photo: photo('malindya.png') },
      { role: 'District Team Head - Administration', name: 'Leo Lion Shamindya Rupasinghe', photo: photo('shamindya.JPEG') },
      { role: 'District Team Head - Club Performance', name: 'Leo Janidu Induwara', photo: photo('janindu.jpeg') },
      { role: 'District Team Head - Fundraising & Management', name: 'Leo Gayathri Kaushalya', photo: photo('gayathri.jpeg') },
      { role: 'District Team Head - Editorial (Chief Bulletin Editor / Content Writing)', name: 'Leo Sineth Wickramaarachchi', photo: photo('sineth.jpg') },
    ],
  },
  {
    title: 'Marketing & Digital Transformations Team',
    items: [
      { name: 'Leo Lion Chiran Damsara', photo: photo('chiran.jpg') },
      { name: 'Leo Lion Thusal Ranawaka', photo: photo('thusal.jpeg') },
      { name: 'Leo Sanduni Charundya', photo: photo('sanduni.jpg') },
    ],
  },
  {
    title: 'Administration Team',
    items: [
      { name: 'Leo Malina Kalupahana', photo: photo('malina.jpg') },
      { name: 'Leo Thevindu Damsith', photo: photo('thevindu.jpg') },
      { name: 'Leo Sathsari Samaranayake', photo: photo('sathsari.jpg') },
    ],
  },
  {
    title: 'Finance and Fundraising Team',
    items: [
      { name: 'Leo Chamod Vishwajith', photo: photo('chamod.jpg') },
      { name: 'Leo Davindu Wickramasinghe', photo: photo('davindu.jpeg') },
      { name: 'Leo Damsath Chiranjeewa', photo: photo('damsath.jpg') },
    ],
  },
  {
    title: 'Editorial & Content Writing Team',
    items: [
      { name: 'Leo Nimasha Edirisooriya', photo: photo('nimasha.jpg') },
      { name: 'Leo Sasira Vihanga', photo: photo('sasira.jpg') },
      { name: 'Leo Malki Madushika', photo: photo('malki.jpg') },
    ],
  },
  {
    title: 'Club Performance Team',
    items: [
      { name: 'Leo Ravija Liyanage', photo: photo('ravija.jpeg') },
      { name: 'Leo Sanithu Kenula', photo: photo('sanithu.jpg') },
      { name: 'Leo Lion Anuk Nisalitha', photo: photo('anuk.jpeg') },
    ],
  },
];

// Modal Component
function OfficialModal({ data, onClose }: { data: ModalData | null; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!data) return null;

  const nextImage = () => {
    if (!data.gallery?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % data.gallery.length);
  };

  const prevImage = () => {
    if (!data.gallery?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
  };

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/90 dark:bg-black/70 overscroll-contain"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto overscroll-contain bg-white/95 dark:bg-black/95 text-gray-900 dark:text-white mx-2 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="flex-1 pr-2">
                <h2 className="heading-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{data.name}</h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mt-1">{data.role}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full glass hover:bg-gray-200/50 dark:hover:bg-white/20 transition-colors text-gray-700 dark:text-gray-300 flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Left side - Photo and Gallery */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/coming-soon.svg'; }}
                />
              </div>

              {/* Gallery Slideshow */}
              {data.gallery && data.gallery.length > 1 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Journey Gallery</h3>
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden bg-black/5">
                      <img
                        src={data.gallery[currentImageIndex]}
                        alt={`${data.name} gallery ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        loading="eager"
                        decoding="async"
                        draggable={false}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/coming-soon.svg'; }}
                      />
                    </div>
                    
                    {/* Gallery Navigation */}
                    <div className="flex justify-between items-center mt-2">
                      <button
                        onClick={prevImage}
                        className="p-1.5 sm:p-2 rounded-full glass hover:bg-gray-200/50 dark:hover:bg-white/20 transition-colors text-gray-700 dark:text-gray-300 touch-manipulation"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <div className="flex gap-1.5 sm:gap-2 items-center">
                        {data.gallery?.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors touch-manipulation ${
                              index === currentImageIndex 
                                ? 'bg-gray-800 dark:bg-white' 
                                : 'bg-gray-400 dark:bg-white/40'
                            }`}
                          />
                        )) || []}
                      </div>
                      
                      <button
                        onClick={nextImage}
                        className="p-1.5 sm:p-2 rounded-full glass hover:bg-gray-200/50 dark:hover:bg-white/20 transition-colors text-gray-700 dark:text-gray-300 touch-manipulation"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Biography */}
            <div className="mt-6 md:mt-0">
              <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-900 dark:text-white">Biography</h3>
              <div
                className="opacity-90 leading-relaxed space-y-3 sm:space-y-4 biography-content text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: data.biography }}
              />
            </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CouncilPage() {
  const [selectedOfficial, setSelectedOfficial] = useState<ModalData | null>(null);

  // Check if an official should have a modal (key positions)
  const shouldShowModal = (role: string) => {
    const keyRoles = [
      'District President',
      'Immediate Past District President',
      'Immediate Past District President / District Contest Director',
      'District Leo Club Chairperson',
      'District Governor',
      'Immediate Past District Governor',
      'District Vice President'
    ];
    return keyRoles.includes(role);
  };

  const handleOfficialClick = (item: SectionItem) => {
    if (shouldShowModal(item.role || '') && item.biography && item.gallery) {
      setSelectedOfficial({
        name: item.name,
        role: item.role || '',
        photo: item.photo || '/logos/lion.png',
        biography: item.biography,
        gallery: item.gallery
      });
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="heading-serif text-3xl font-bold">District Council</h1>

      {sections.map((section) => (
        <section key={section.title} className="space-y-5">
          <h2 className="heading-serif text-2xl font-semibold">{section.title}</h2>
          <div className={`flex gap-5 ${(section.title === 'Region Directors' || section.title === 'District Team Heads') ? 'flex-nowrap overflow-x-auto justify-start' : 'flex-wrap justify-center'}`}>
            {section.items.map((m, idx) => (
              <motion.div
                key={`${section.title}-${idx}-${m.name}`}
                className={`surface-card rounded-xl overflow-hidden group ${(section.title === 'Region Directors' || section.title === 'District Team Heads') ? 'w-48 sm:w-56' : 'w-full sm:w-64'} ${
                  shouldShowModal(m.role || '') ? 'cursor-pointer hover:ring-2 hover:ring-rose/40' : ''
                }`}
                whileHover={{ y: -6 }}
                onClick={() => handleOfficialClick(m)}
              >
                {/* Square image wrapper */}
                <div className="relative w-full aspect-square overflow-hidden bg-black/5">
                  <img
                    src={m.photo || '/logos/lion.png'}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/coming-soon.svg'; }}
                  />
                  {/* Click indicator for key officials */}
                  {shouldShowModal(m.role || '') && (
                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <div className="font-semibold">{m.name}</div>
                  {m.role && <div className="text-sm opacity-70">{m.role}</div>}
                  {shouldShowModal(m.role || '') && (
                    <div className="text-xs opacity-50 mt-1">Click for details</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {/* Modal */}
      <OfficialModal 
        data={selectedOfficial} 
        onClose={() => setSelectedOfficial(null)} 
      />
    </div>
  );
}