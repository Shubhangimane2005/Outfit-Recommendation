import React, { useState } from 'react';
import { Briefcase, User, Users, ArrowLeft } from 'lucide-react';

const professionsData = [
    // 1. College Professor
    {
        name: 'College Professor',
        coreGoal: 'To appear knowledgeable, authoritative, and approachable, commanding respect without creating a barrier.',
        men: [
            { title: 'The Classic Academic', description: 'A lightweight navy or beige linen/cotton blazer, a crisp white button-down shirt, and tailored grey or khaki chinos.', whyItWorks: 'This look projects authority with the blazer, but the softer fabrics make it less rigid than a suit, appearing more approachable to students.', imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Ethnic Scholar', description: 'A well-fitted, high-quality cotton or silk kurta in a muted color with smart, light-colored linen trousers.', whyItWorks: 'Elegant, comfortable, and culturally resonant, this projects grounded wisdom. The breathable fabric is ideal for Mumbai\'s climate.', imageUrl: 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Casual Mentor', description: 'A smart, collared polo shirt with dark-wash, well-fitting jeans (no rips) or comfortable cotton trousers.', whyItWorks: 'Perfect for office hours, the collared shirt keeps it professional while the overall look is relaxed, signaling you are open to discussion.', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Intellectual', description: 'A formal button-down shirt, a sleeveless Nehru jacket (bundi), and dark, tailored trousers.', whyItWorks: 'A sophisticated fusion look. The Nehru jacket adds a sharp, structured element that is more comfortable and modern than a full blazer, conveying style and forward-thinking.', imageUrl: 'https://images.pexels.com/photos/9050567/pexels-photo-9050567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Timeless Intellectual', description: 'An elegant handloom cotton or linen sari with a simple, well-stitched blouse.', whyItWorks: 'The sari is a powerful symbol of grace and authority in Indian academia. Breathable handloom fabrics ensure comfort while communicating a connection to culture.', imageUrl: 'https://images.pexels.com/photos/15579308/pexels-photo-15579308/free-photo-of-woman-in-a-saree-in-a-garden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Professional', description: 'High-waisted, wide-leg trousers (palazzos) with a fitted silk or satin blouse tucked in.', whyItWorks: 'A chic, contemporary, and comfortable choice. It looks effortlessly polished and projects the image of a confident, modern educator.', imageUrl: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Fusionist Educator', description: 'A well-structured, long kurti with straight-cut cigarette pants and an elegant scarf.', whyItWorks: 'The quintessential smart-casual uniform for the modern Indian professional woman. It is versatile, dignified, and practical for the day-to-day rigors of teaching.', imageUrl: 'https://images.pexels.com/photos/11832269/pexels-photo-11832269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Approachable Guide', description: 'A knee-length A-line skirt, a high-quality knit top, and a lightweight, long-line shrug.', whyItWorks: 'This Western-inspired look is softer and more relaxed, perfect for fostering an interactive learning environment and making you seem more accessible to students.', imageUrl: 'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 2. Software Engineer
    {
        name: 'Software Engineer',
        coreGoal: 'To look comfortable, functional, and part of the collaborative, innovative tech culture.',
        men: [
            { title: 'The Classic Coder', description: 'A high-quality, plain t-shirt, dark-wash slim-fit jeans, and clean sneakers.', whyItWorks: 'This is the global uniform of the tech industry. The emphasis on quality (good fabric, good fit) ensures you look intentional, not sloppy.', imageUrl: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Polished Presenter', description: 'A casual henley shirt or a smart polo with comfortable chinos.', whyItWorks: 'A subtle step up from a t-shirt, perfect for sprint reviews or internal demos, showing polish without appearing corporate.', imageUrl: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The All-Day Comfort', description: 'A stylish, well-fitting zip-up hoodie, a comfortable t-shirt, and high-quality joggers.', whyItWorks: 'For long days of deep focus, this prioritizes comfort. Modern, athletic-leisure brands look clean and intentional.', imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Layered Look', description: 'An open, lightweight flannel or casual check shirt over a plain t-shirt, paired with jeans.', whyItWorks: 'Highly practical for moving between the humid outdoors and a heavily air-conditioned office. This adds visual interest and personality.', imageUrl: 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Effortless Developer', description: 'Dark, well-fitting jeggings or jeans, a stylish but comfortable top, and a lightweight denim jacket or a cozy, long cardigan.', whyItWorks: 'Supremely comfortable for sitting long hours, yet looks put-together. The outer layer is perfect for managing office AC.', imageUrl: 'https://images.pexels.com/photos/7619941/pexels-photo-7619941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The One-Piece Wonder', description: 'A comfortable t-shirt dress or a casual A-line jersey dress, paired with clean white sneakers.', whyItWorks: 'Requires minimal effort but looks instantly chic. A dress allows for great airflow, and sneakers keep it grounded in the casual tech culture.', imageUrl: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Creative Coder', description: 'A casual, loose-fitting jumpsuit in a breathable fabric like cotton or Tencel.', whyItWorks: 'A fashion-forward choice that shows personality and creativity. It’s a single piece that makes a complete outfit and ensures comfort.', imageUrl: 'https://images.pexels.com/photos/3755734/pexels-photo-3755734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Relaxed Fusionist', description: 'Comfortable, printed palazzo pants or cotton trousers paired with a simple, solid-colored short kurti or a long tunic top.', whyItWorks: 'A fantastic way to incorporate ethnic wear into a modern workplace. It\'s incredibly comfortable, breathable, and expresses individuality.', imageUrl: 'https://images.pexels.com/photos/10556947/pexels-photo-10556947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 3. Doctor / Physician
    {
        name: 'Doctor / Physician',
        coreGoal: 'To inspire trust, confidence, and a sense of calm. Attire must be impeccably clean, practical, and professional.',
        men: [
            { title: 'The Clinical Standard', description: 'Clean, well-fitting scrubs under a crisp, pressed white lab coat.', whyItWorks: 'This is the universal uniform of healthcare. The white lab coat is a powerful symbol of medical authority, expertise, and cleanliness.', imageUrl: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Consultation Attire', description: 'Formal, pleated trousers, a light-colored, half-sleeve formal shirt, and polished, closed-toe leather shoes.', whyItWorks: 'This business-casual look is professional and serious, conveying respect for the patient. Half-sleeves are practical and comfortable in the heat.', imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Approachable GP', description: 'Smart chinos, a pressed, light-colored button-down shirt with neatly rolled sleeves.', whyItWorks: 'This look is slightly less formal, making you seem more personable and effective in building rapport and trust with patients.', imageUrl: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'ER Practicality', description: 'High-quality scrubs with supportive, comfortable, and easy-to-clean medical clogs or athletic shoes.', whyItWorks: 'In a high-pressure environment like the ER, function is everything. This outfit is purely about mobility, comfort, and endurance.', imageUrl: 'https://images.pexels.com/photos/6749779/pexels-photo-6749779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Authoritative Professional', description: 'Clean scrubs under a well-tailored, crisp white lab coat with hair neatly tied back.', whyItWorks: 'This uniform immediately communicates medical authority and prioritizes hygiene. A well-fitting lab coat looks sharp and professional.', imageUrl: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Elegant Consultant', description: 'A simple, well-tailored salwar kameez or kurti with straight pants in a sober, solid color.', whyItWorks: 'Highly respected and professional for female doctors in India. It is dignified, comfortable, and allows for ease of movement.', imageUrl: 'https://images.pexels.com/photos/5407054/pexels-photo-5407054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Clinician', description: 'Formal, tailored trousers, a simple, modest blouse or a professional shell top, and comfortable, closed-toe flats.', whyItWorks: 'A standard Western business-casual look that is always appropriate. The focus is on clean lines and a neat silhouette.', imageUrl: 'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Surgical Focus', description: 'Full surgical scrubs, a head cover, a mask, and designated surgical footwear.', whyItWorks: 'Non-negotiable in the operating theatre. Every element is designed to maintain a sterile field and prevent infection.', imageUrl: 'https://images.pexels.com/photos/3958043/pexels-photo-3958043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 4. Lawyer
    {
        name: 'Lawyer',
        coreGoal: 'To project authority, credibility, and meticulous attention to detail. The dress code is conservative and commands respect.',
        men: [
            { title: 'The Courtroom Armour', description: 'A well-tailored, dark charcoal grey or navy blue suit in a tropical wool blend, a crisp white formal shirt, and a conservative silk tie.', whyItWorks: 'This is the uniform of the legal profession. It\'s a visual representation of power, seriousness, and respect for the institution of law.', imageUrl: 'https://images.pexels.com/photos/8112167/pexels-photo-8112167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Client Strategist', description: 'A lighter grey suit, a light blue or subtly patterned formal shirt, and a professional tie.', whyItWorks: 'Still impeccably professional, this look is slightly less intimidating, helping to build rapport with a client while inspiring confidence.', imageUrl: 'https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Senior Partner Look', description: 'A classic navy blazer with sharply creased grey or beige trousers (separates).', whyItWorks: 'This look projects an air of established success and quiet confidence, showing authority without the rigidity of a full suit.', imageUrl: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The In-Office Researcher', description: 'Formal dress trousers and a high-quality, long-sleeved formal shirt with the sleeves neatly rolled up.', whyItWorks: 'This "shirt-sleeve order" look is still professional and sharp but allows for greater focus. The rolled sleeves signal "I\'m working hard."', imageUrl: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Traditional Advocate', description: 'A crisp, starched cotton sari in black or white, paired with a professional, high-necked, three-quarter sleeve blouse.', whyItWorks: 'In the Indian legal system, this is the pinnacle of formal courtroom attire. A powerful statement of dignity, tradition, and authority.', imageUrl: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Power Suit', description: 'A well-tailored pantsuit in black, navy, or charcoal with a simple, high-quality shell top.', whyItWorks: 'The pantsuit is a modern symbol of female power and equality in the legal world. It is sharp, commanding, and practical.', imageUrl: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Sophisticated Counsel', description: 'A structured, knee-length sheath dress in a solid, conservative color, paired with a matching formal blazer.', whyItWorks: 'A classic, feminine, and powerful alternative to a suit. It is polished and authoritative, transitioning seamlessly from a client meeting to a courtroom.', imageUrl: 'https://images.pexels.com/photos/1181592/pexels-photo-1181592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Business Formal Day', description: 'A formal pencil skirt or tailored wide-leg trousers, paired with an elegant pussy-bow blouse or a simple silk top.', whyItWorks: 'For days in the office, this look is slightly softer than a full suit but remains strictly business formal, showing a keen eye for detail.', imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 5. Graphic Designer
    {
        name: 'Graphic Designer',
        coreGoal: 'To visually communicate your creativity, sense of style, and understanding of aesthetics. Your outfit is part of your portfolio.',
        men: [
            { title: 'The Minimalist Aesthete', description: 'All-black outfit: a black crew-neck t-shirt, slim-fit black jeans, and black Chelsea boots or sneakers.', whyItWorks: 'A classic in the design world. It\'s effortlessly cool and creates a clean canvas, implying that your creative work is the star.', imageUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Urban Creative', description: 'A unique graphic t-shirt, dark-wash cuffed jeans, a bomber jacket, and fashionable sneakers.', whyItWorks: 'This showcases your personality and connection to current trends. A unique graphic tee acts as a conversation starter.', imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Smart-Casual Pitch', description: 'A casual, unstructured blazer, a simple white t-shirt, and dark chinos.', whyItWorks: 'Perfectly balances creativity with professionalism. The blazer says "I\'m serious," while the t-shirt says "I\'m a creative thinker."', imageUrl: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Print & Pattern Pro', description: 'A short-sleeved button-down shirt with a bold, artistic print, paired with solid-colored shorts or trousers.', whyItWorks: 'Demonstrates a confident handling of pattern and color, a core design skill. It’s a walking testament to your aesthetic abilities.', imageUrl: 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Architectural Designer', description: 'Wide-leg black trousers, an asymmetrical white top, and bold silver jewelry.', whyItWorks: 'Wearing clothes with interesting shapes and lines directly reflects a designer\'s eye. This look is sophisticated and artistic.', imageUrl: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Color Theorist', description: 'A brightly colored midi skirt or dress, artfully clashed with a top or accessory in a complementary color.', whyItWorks: 'Demonstrates a masterful understanding of color theory, a key skill in graphic design. It’s playful and confident.', imageUrl: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Brand-Savvy Creative', description: 'High-waisted "mom" jeans, a tucked-in vintage-style t-shirt or blouse, and a leather jacket.', whyItWorks: 'This look is trendy and effortlessly cool, showing an awareness of branding and subcultures.', imageUrl: 'https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Effortless Freelancer', description: 'A stylish and comfortable oversized linen shirt worn with leggings, paired with artistic accessories.', whyItWorks: 'Communicates a relaxed, confident creativity. Comfortable for long hours but looks chic and intentional.', imageUrl: 'https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 6. Marketing Manager
    {
        name: 'Marketing Manager',
        coreGoal: 'To look polished, trendy, and confident, balancing creativity with a professional edge.',
        men: [
            { title: 'The Modern Marketer', description: 'A sharp, unstructured blazer in a modern color like olive or burgundy, paired with a premium crew-neck tee and slim-fit dark jeans.', whyItWorks: 'This look is the epitome of smart-casual. It shows you understand trends and creativity but are still serious about business.', imageUrl: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Polished Pitch', description: 'A slim-fit, subtly patterned button-down shirt (like micro-dots or a fine check) with tailored chinos and leather loafers.', whyItWorks: 'It’s a step up from casual, perfect for client meetings. The pattern shows personality and attention to detail, crucial in marketing.', imageUrl: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Creative Strategist', description: 'A high-quality knit polo or a turtleneck sweater with smart wool trousers and clean, minimalist sneakers.', whyItWorks: 'This look is sophisticated and modern, suggesting a forward-thinking and strategic mindset. It’s comfortable for long brainstorming sessions.', imageUrl: 'https://images.pexels.com/photos/5695977/pexels-photo-5695977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Networker', description: 'A tailored suit in a contemporary fabric, worn with a crisp open-collar shirt (no tie) for industry events.', whyItWorks: 'Projects confidence and success. Skipping the tie makes the formal suit more approachable and modern, suitable for networking.', imageUrl: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Power Dresser', description: 'A bold-colored blazer over a neutral-toned midi dress, paired with pointed-toe heels.', whyItWorks: 'A colorful blazer is a statement piece that exudes confidence and makes you memorable, while the classic dress keeps it professional.', imageUrl: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Chic Creative', description: 'Stylish wide-leg trousers or culottes with a tucked-in silk blouse and block heels.', whyItWorks: 'This on-trend silhouette shows you have a finger on the pulse of fashion, reflecting your role in a dynamic industry. It’s both comfortable and highly polished.', imageUrl: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Effortless Expert', description: 'A well-fitted knit top, a stylish A-line or pleated midi skirt, and ankle boots.', whyItWorks: 'This combination is feminine, stylish, and professional. It’s comfortable enough for a busy day but looks effortlessly put-together for any impromptu meetings.', imageUrl: 'https://images.pexels.com/photos/7139708/pexels-photo-7139708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Casual Innovator', description: 'High-quality dark-wash jeans (no rips), a statement blouse, and a tailored blazer.', whyItWorks: 'Perfect for a creative agency environment. The blazer elevates the jeans, showing that you can be both relaxed and professional.', imageUrl: 'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 7. Financial Analyst
    {
        name: 'Financial Analyst',
        coreGoal: 'To project trustworthiness, precision, and seriousness in a conservative industry.',
        men: [
            { title: 'The Industry Standard', description: 'A well-tailored navy or charcoal grey two-piece suit, a crisp white or light blue dress shirt, a conservative tie, and polished leather oxfords.', whyItWorks: 'This is the uniform of finance. It communicates professionalism, attention to detail, and respect for the conservative nature of the industry.', imageUrl: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Business Casual Day', description: 'Sharply creased dress trousers (grey or navy), a perfectly ironed button-down shirt, and a V-neck merino wool sweater.', whyItWorks: 'For days without client meetings, this look remains professional and sharp while offering more comfort than a full suit.', imageUrl: 'https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Subtle Statement', description: 'A suit with a subtle pattern like pinstripes or a faint plaid, paired with a solid shirt and tie.', whyItWorks: 'Shows a level of sartorial confidence and personality while staying well within the bounds of traditional corporate wear.', imageUrl: 'https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The "Sleeves Rolled Up" Look', description: 'High-quality formal trousers and a premium dress shirt with the sleeves neatly rolled to the forearm.', whyItWorks: 'This look signals hard work and focus, perfect for late nights analyzing data. The key is that the clothes are still of impeccable quality.', imageUrl: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Power Suit', description: 'A perfectly tailored pantsuit or skirt suit in a conservative color like black, navy, or grey, with a simple shell top underneath.', whyItWorks: 'This look is authoritative and professional, projecting an image of competence and seriousness that commands respect in the finance world.', imageUrl: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Sophisticated Separates', description: 'A high-waisted pencil skirt, a silk or crepe de chine blouse, and a structured blazer.', whyItWorks: 'A classic and powerful combination that is both feminine and formal. It allows for more variety than a suit while maintaining a strict professional code.', imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Sheath Dress', description: 'A structured, knee-length sheath dress in a solid, neutral color, often worn with a cardigan or a blazer.', whyItWorks: 'This is a one-piece solution for a polished, professional look. It is simple, elegant, and conveys a sense of refined competence.', imageUrl: 'https://images.pexels.com/photos/1181592/pexels-photo-1181592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Business Formal Trousers', description: 'Tailored wide-leg or straight-leg trousers with a high-quality knit sweater or a modest blouse.', whyItWorks: 'This is a comfortable yet sharp option for daily office wear. The focus is on clean lines and high-quality fabrics to maintain a polished look.', imageUrl: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 8. Journalist / Reporter
    {
        name: 'Journalist / Reporter',
        coreGoal: 'To look credible and professional, yet adaptable and ready for any situation, from an office to a field report.',
        men: [
            { title: 'The Versatile Reporter', description: 'A durable utility or field jacket over a button-down shirt, paired with dark chinos and comfortable leather boots.', whyItWorks: 'This look is practical for being on the move, with pockets for gear, yet the collared shirt keeps it professional enough for an interview.', imageUrl: 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Interview Attire', description: 'A smart navy blazer, a crisp open-collar light blue shirt, and grey trousers. No tie needed.', whyItWorks: 'This classic combination projects authority and credibility without being as rigid as a full suit, making sources feel more at ease.', imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The On-Air Professional', description: 'A well-fitted suit jacket in a solid color (like blue or grey) and a contrasting solid shirt. Focus is on the top half.', whyItWorks: 'Solid, non-distracting colors are key for television. A sharp jacket projects seriousness and expertise to the viewing audience.', imageUrl: 'https://images.pexels.com/photos/8112167/pexels-photo-8112167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Investigative Journalist', description: 'Dark-wash, well-fitting jeans, a durable chambray or oxford shirt, and comfortable, sturdy shoes.', whyItWorks: 'This is a practical, no-nonsense look for long days of research or fieldwork. It’s understated and allows you to blend in.', imageUrl: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Go-Getter', description: 'Tailored trousers, a practical yet stylish blouse, and a classic trench coat.', whyItWorks: 'The trench coat is an iconic piece for journalists—it’s practical for all weather and adds an instant layer of polish and authority.', imageUrl: 'https://images.pexels.com/photos/3755734/pexels-photo-3755734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Broadcast Look', description: 'A jewel-toned (sapphire blue, emerald green) sheath dress or a sharp blazer.', whyItWorks: 'Bold, solid colors stand out well on camera and convey confidence. The clean lines of a sheath dress or blazer look professional and authoritative.', imageUrl: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Field Reporter', description: 'Smart, dark-colored trousers or jeans, a comfortable knit top, and a utility jacket with multiple pockets, paired with flat boots.', whyItWorks: 'This outfit prioritizes function and mobility for reporting on location, while still looking composed and credible.', imageUrl: 'https://images.pexels.com/photos/7619941/pexels-photo-7619941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Versatile Wrap Dress', description: 'A comfortable jersey wrap dress in a solid color or a subtle print.', whyItWorks: 'A wrap dress is incredibly versatile. It can be worn alone for an office setting or layered under a jacket for fieldwork, always looking polished.', imageUrl: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 9. Fitness Trainer
    {
        name: 'Fitness Trainer',
        coreGoal: 'To look athletic, professional, and motivational, with an emphasis on functional and high-quality athletic wear.',
        men: [
            { title: 'The Classic Trainer', description: 'A high-quality, moisture-wicking athletic t-shirt or polo, smart athletic shorts or joggers, and clean, supportive training shoes.', whyItWorks: 'This look is functional and professional. High-quality fabrics show you take your profession seriously, and the clean look is motivational for clients.', imageUrl: 'https://images.pexels.com/photos/4164765/pexels-photo-4164765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Layered Athlete', description: 'A fitted long-sleeve performance top under a short-sleeve athletic shirt, paired with tapered joggers.', whyItWorks: 'Layering is practical for warming up and cooling down, and it creates a more dynamic, athletic look that highlights a fit physique.', imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Performance Specialist', description: 'A compression shirt that shows muscle definition, worn with technical athletic shorts.', whyItWorks: 'For performance-focused training, this look is aspirational for clients. It clearly showcases the results of training and your expertise in fitness.', imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Coach', description: 'A stylish quarter-zip pullover, comfortable performance pants, and trendy training sneakers.', whyItWorks: 'This look is slightly more covered and polished, great for consultations or coaching. It has an authoritative, coach-like feel.', imageUrl: 'https://images.pexels.com/photos/4162589/pexels-photo-4162589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Polished Professional', description: 'High-waisted, high-quality leggings paired with a matching fitted tank top or sports bra and a stylish zip-up jacket.', whyItWorks: 'A coordinated set looks intentional and professional. The high waist is flattering and practical for demonstrations, projecting a polished, expert image.', imageUrl: 'https://images.pexels.com/photos/4167936/pexels-photo-4167936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Motivational Coach', description: 'Brightly colored leggings or a top to add a pop of energy, paired with neutral pieces.', whyItWorks: 'Wearing energetic colors can be motivational and uplifting for clients. It shows personality and a positive attitude.', imageUrl: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Functional Fit', description: 'Comfortable athletic shorts over compression leggings, with a supportive sports bra and a loose, breathable tank top.', whyItWorks: 'This layered look is all about function and comfort during intense workouts, showing that you prioritize performance.', imageUrl: 'https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Yoga/Pilates Instructor', description: 'Fitted yoga pants or flares with a stylish, strappy sports bra or a soft, draped top.', whyItWorks: 'This look allows for maximum flexibility and movement, showcasing long lines and proper form, which is essential for instruction.', imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 10. Chef
    {
        name: 'Chef',
        coreGoal: 'To maintain the highest standards of hygiene, safety, and professionalism in a high-pressure kitchen environment.',
        men: [
            { title: 'The Classic Executive Chef', description: 'A crisp, white, double-breasted chef\'s jacket (toque blanche), traditional black-and-white checkered pants, and non-slip kitchen clogs.', whyItWorks: 'This is the universal symbol of culinary authority. The white jacket signifies cleanliness, and the double breast can be reversed to hide stains.', imageUrl: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Culinarian', description: 'A grey or black single-breasted chef jacket with moisture-wicking fabric, paired with solid black chef trousers.', whyItWorks: 'A modern, sleek take on the classic uniform. Darker colors are practical for hiding stains, and modern fabrics offer better comfort and breathability.', imageUrl: 'https://images.pexels.com/photos/4099125/pexels-photo-4099125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Open Kitchen Look', description: 'A stylish bib apron over a dark t-shirt and chef pants, often with a beanie or cap.', whyItWorks: 'For chefs visible to guests, this look is more approachable and stylish. The high-quality apron is the key professional element.', imageUrl: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Head Chef Off-Duty', description: 'A crisp button-down shirt, smart trousers, and a clean apron for front-of-house interactions or meetings.', whyItWorks: 'This look bridges the gap between the kitchen and the dining room, maintaining a professional and authoritative presence.', imageUrl: 'https://images.pexels.com/photos/3217157/pexels-photo-3217157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Professional Chef de Cuisine', description: 'A well-fitted, tailored white chef jacket, comfortable chef trousers, and certified non-slip shoes.', whyItWorks: 'A properly fitting jacket is key. It avoids safety hazards from loose fabric and projects a sharp, competent, and professional image.', imageUrl: 'https://images.pexels.com/photos/4049791/pexels-photo-4049791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Pastry Artist', description: 'A clean, short-sleeved chef jacket or a simple white t-shirt under a full-length apron, with hair neatly tied back or under a head wrap.', whyItWorks: 'Pastry work can be intricate, and short sleeves prevent getting in the way. The apron provides full coverage and maintains cleanliness.', imageUrl: 'https://images.pexels.com/photos/3622479/pexels-photo-3622479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Urban Gastronomist', description: 'A dark-colored, modern chef coat, often with unique detailing, paired with black chef pants and a stylish head covering.', whyItWorks: 'This contemporary look is practical and stylish, often seen in modern, trend-setting restaurants. It reflects creativity and professionalism.', imageUrl: 'https://images.pexels.com/photos/6287493/pexels-photo-6287493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Food Truck Owner', description: 'A branded, high-quality t-shirt or polo shirt with a durable half-apron and a cap or bandana.', whyItWorks: 'This is a more casual but still professional uniform. The branding promotes the business, and the apron ensures functionality and hygiene.', imageUrl: 'https://images.pexels.com/photos/761815/pexels-photo-761815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 11. Architect
    {
        name: 'Architect',
        coreGoal: 'To reflect your design philosophy—structured, creative, and detail-oriented, with a nod to minimalism and quality.',
        men: [
            { title: 'The Minimalist', description: 'An all-black ensemble: a black turtleneck or crew-neck sweater, slim-fit black trousers, and black leather boots.', whyItWorks: 'The quintessential architect uniform. It’s a clean, intellectual look that creates a neutral canvas, putting the focus on your designs and ideas.', imageUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Structuralist', description: 'A sharp, unstructured blazer in a neutral color (grey, navy) over a simple white shirt, paired with dark tailored trousers.', whyItWorks: 'This look mirrors architectural principles—clean lines, good structure, and understated quality. It’s professional for client meetings but still feels creative.', imageUrl: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Site Visit Practical', description: 'A durable chore coat or field jacket, a simple henley or button-down, dark-wash jeans, and sturdy leather boots.', whyItWorks: 'Functional for construction site visits, this outfit is practical and durable while still maintaining a sense of design-conscious style.', imageUrl: 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Japanese-Inspired', description: 'A band-collar shirt (Mao collar), wide-leg cropped trousers, and minimalist leather sneakers.', whyItWorks: 'This fashion-forward look shows an appreciation for international design and minimalism. It’s creative, comfortable, and makes a quiet statement.', imageUrl: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Sculptural Silhouette', description: 'An outfit with architectural elements, such as an asymmetrical top, wide-leg trousers, and a structured, longline vest.', whyItWorks: 'Wearing clothes with interesting shapes, lines, and drapes is a direct reflection of a design-focused mind. It’s a walking piece of art.', imageUrl: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Monochromatic Master', description: 'A head-to-toe look in a single neutral color, like shades of grey, beige, or navy, playing with different textures.', whyItWorks: 'This is a highly sophisticated and chic look that demonstrates a masterful understanding of tone and texture, much like a well-designed building.', imageUrl: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Deconstructed Classic', description: 'A classic white shirt but with a twist (e.g., oversized cuffs, an unusual collar), paired with tailored black pants and statement flats.', whyItWorks: 'This shows an appreciation for classic forms but with a creative, modern reinterpretation—a core skill for an architect.', imageUrl: 'https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Client Pitch Polish', description: 'A simple, high-quality sheath dress in a dark neutral, paired with a unique piece of statement jewelry (like a bold geometric necklace).', whyItWorks: 'The dress is professional and clean, while the artistic jewelry serves as a conversation starter and a subtle showcase of your design taste.', imageUrl: 'https://images.pexels.com/photos/1181592/pexels-photo-1181592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 12. HR Manager
    {
        name: 'HR Manager',
        coreGoal: 'To appear approachable, professional, and trustworthy, creating a look that is polished but not intimidating.',
        men: [
            { title: 'The Approachable Professional', description: 'A soft-shouldered blazer, a fine-gauge knit sweater over a collared shirt, and smart chinos.', whyItWorks: 'This layered look is professional without being stuffy. The softer textures of the knit and blazer make you seem more open and approachable.', imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Business Casual Standard', description: 'A crisp, non-iron button-down shirt (in a welcoming color like light blue or a subtle check), tailored trousers, and leather derby shoes.', whyItWorks: 'This is a reliable and universally professional look that projects competence and neatness, essential traits for an HR role.', imageUrl: 'https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Mediator', description: 'A smart quarter-zip pullover worn over a collared shirt with well-fitting wool trousers.', whyItWorks: 'This look is modern, clean, and less formal than a blazer, perfect for internal meetings and creating a collaborative atmosphere.', imageUrl: 'https://images.pexels.com/photos/5695977/pexels-photo-5695977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Onboarding Day Look', description: 'A friendly-colored polo shirt, comfortable yet smart trousers, and clean loafers.', whyItWorks: 'For company events or onboarding new hires, a polo is professional but relaxed, helping to make a positive and welcoming first impression.', imageUrl: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Welcoming Professional', description: 'A soft, unstructured blazer or a high-quality cardigan over a simple shell top, paired with tailored trousers.', whyItWorks: 'Softer layers like a cardigan or knit blazer are less intimidating than a sharp suit jacket, making you appear more approachable and trustworthy.', imageUrl: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Elegant Mediator', description: 'A knee-length A-line or wrap dress in a solid, calming color like blue, green, or a soft neutral.', whyItWorks: 'A dress is a complete outfit that looks polished and put-together. The wrap style is particularly flattering and universally professional.', imageUrl: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Business Casual Go-To', description: 'A stylish blouse (perhaps with a subtle print or detail like a tie-neck) tucked into wide-leg or straight-leg trousers.', whyItWorks: 'This look is the perfect balance of professional and stylish. The interesting blouse shows personality while the trousers keep it grounded in a business context.', imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The HR Strategist', description: 'A sophisticated knit top paired with a pleated midi skirt and comfortable block heels.', whyItWorks: 'This combination is modern, comfortable, and chic. It conveys a sense of being both a strategic thinker and an empathetic people person.', imageUrl: 'https://images.pexels.com/photos/7139708/pexels-photo-7139708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 13. Real Estate Agent
    {
        name: 'Real Estate Agent',
        coreGoal: 'To look successful, trustworthy, and polished, inspiring confidence in clients to handle their biggest investment.',
        men: [
            { title: 'The Polished Professional', description: 'A well-tailored sports coat or blazer, a crisp open-collar dress shirt, and high-quality trousers with leather loafers.', whyItWorks: 'This look strikes the perfect balance between professional and approachable. It says you are successful and detail-oriented but not too stiff for a house viewing.', imageUrl: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Luxury Market Look', description: 'A sharp, slim-fit suit in a premium fabric, paired with a high-quality shirt and a subtle pocket square. Tie is optional.', whyItWorks: 'When dealing with high-end properties, your attire should reflect the quality of your listings. This look conveys luxury, success, and confidence.', imageUrl: 'https://images.pexels.com/photos/8112167/pexels-photo-8112167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Weekend Showing', description: 'A smart, fitted polo shirt, well-maintained dark chinos, and clean, fashionable leather sneakers or boat shoes.', whyItWorks: 'For a more relaxed weekend showing, this look is comfortable and stylish. It’s professional enough to be taken seriously but casual enough to make clients feel comfortable.', imageUrl: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The All-Weather Agent', description: 'A stylish trench coat or a quilted jacket over a button-down shirt and trousers.', whyItWorks: 'A quality piece of outerwear is essential for agents who are constantly on the go. It ensures you look polished and prepared, regardless of the weather.', imageUrl: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Trusted Advisor', description: 'A tailored blazer, a simple high-quality top, and dark, straight-leg trousers or a pencil skirt.', whyItWorks: 'This is a classic, powerful look that projects competence and trustworthiness. It’s a uniform that instantly inspires confidence in your clients.', imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Modern Agent', description: 'A stylish, structured jumpsuit in a solid color, paired with elegant flats or block heels.', whyItWorks: 'A jumpsuit is a fashion-forward yet professional choice. It’s a complete outfit that looks incredibly chic and signals that you are modern and successful.', imageUrl: 'https://images.pexels.com/photos/3755734/pexels-photo-3755734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Elegant Professional', description: 'A polished sheath dress in a memorable but professional color, worn with a quality handbag and comfortable heels.', whyItWorks: 'A well-fitting dress is both professional and memorable. It ensures you look put-together and successful from the first meeting to the closing.', imageUrl: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Open House Host', description: 'Smart dark-wash jeans, an elegant silk blouse, and a blazer or stylish cardigan.', whyItWorks: 'This elevated casual look is perfect for hosting an open house. It’s approachable and friendly while still maintaining a polished, professional edge.', imageUrl: 'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 14. Civil Engineer
    {
        name: 'Civil Engineer',
        coreGoal: 'To balance professionalism for client meetings with practicality and safety for on-site work.',
        men: [
            { title: 'The Office-to-Site Look', description: 'A durable button-down shirt (like chambray or thick oxford), rugged chinos or canvas work pants, and sturdy leather work boots.', whyItWorks: 'This is the quintessential engineering uniform. It’s tough enough for a construction site but looks smart enough for a quick office meeting.', imageUrl: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Client Presentation', description: 'A navy or grey blazer over a collared shirt, paired with smart trousers. Keep safety boots in the car to change into.', whyItWorks: 'This projects a professional and authoritative image for important client presentations, showing you can handle both the plans and the people.', imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Project Manager', description: 'A company-branded polo shirt, comfortable work trousers with utility pockets, and steel-toed boots.', whyItWorks: 'The polo is less formal than a button-down, making you approachable to your team, while the professional branding and practical pants keep it official.', imageUrl: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The All-Weather Engineer', description: 'A high-visibility or durable waterproof jacket over a flannel shirt, with cargo pants and safety boots.', whyItWorks: 'Safety and practicality are paramount. This layered look ensures you are prepared for all weather conditions on-site while complying with safety standards.', imageUrl: 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Field-Ready Professional', description: 'A fitted, practical button-down shirt, durable women\'s work pants or cargo pants, and steel-toed work boots.', whyItWorks: 'This look prioritizes function and safety without sacrificing fit. Properly fitting workwear looks more professional and is safer on site.', imageUrl: 'https://images.pexels.com/photos/7619941/pexels-photo-7619941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Design Review Attire', description: 'Smart trousers, a professional blouse, and a tailored blazer. Keep a hard hat and safety vest ready.', whyItWorks: 'For office-based work and meetings, this projects a polished, competent image. It shows you command respect in the design and planning phase.', imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Practical Supervisor', description: 'A comfortable henley or long-sleeve tee, a fleece or utility vest for warmth and pockets, and rugged jeans.', whyItWorks: 'The vest is a key practical item, providing core warmth and easy access to tools or phones, while the overall look is capable and ready for action.', imageUrl: 'https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Smart Casual Engineer', description: 'A high-quality knit sweater, dark-wash jeans, and comfortable yet durable flat boots.', whyItWorks: 'A perfect blend for days that might involve both office work and a quick, non-hazardous site visit. It’s smart, comfortable, and practical.', imageUrl: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
    // 15. Photographer
    {
        name: 'Photographer',
        coreGoal: 'To be comfortable, functional, and able to move freely, often in an understated way that allows you to blend into the background.',
        men: [
            { title: 'The Wedding Photographer', description: 'An all-black outfit: black button-down shirt, black smart trousers or chinos, and comfortable black leather shoes.', whyItWorks: 'Black is the unofficial uniform for event photographers. It makes you inconspicuous so you don’t distract from the main event, and it always looks professional.', imageUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Street Photographer', description: 'A comfortable t-shirt, a multi-pocket utility vest or jacket, durable jeans or cargo pants, and all-day walking shoes.', whyItWorks: 'This outfit is all about function. The pockets are essential for lenses and gear, and comfort is key for spending hours on your feet.', imageUrl: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Studio Portrait Artist', description: 'A simple, dark-colored henley or polo shirt, comfortable dark jeans, and clean sneakers.', whyItWorks: 'In a controlled studio environment, comfort is still important, but the look can be a bit more relaxed. Dark colors prevent reflections in your shots.', imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Client Consultation', description: 'A casual blazer, a simple t-shirt, and smart chinos.', whyItWorks: 'When meeting with clients to book a shoot, this look is creative yet professional. It shows you have a good eye for style, which builds their trust in your artistic vision.', imageUrl: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        women: [
            { title: 'The Event Professional', description: 'A chic all-black jumpsuit or a combination of a black blouse and wide-leg black trousers with comfortable flats.', whyItWorks: 'Black allows you to blend into the background at events. A jumpsuit is a stylish and practical one-piece solution that allows for easy movement.', imageUrl: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Adventure Photographer', description: 'A moisture-wicking top, practical hiking pants or leggings, a weather-resistant jacket, and hiking boots.', whyItWorks: 'For landscape or travel photography, your clothing is gear. This outfit prioritizes durability, comfort, and protection from the elements.', imageUrl: 'https://images.pexels.com/photos/7619941/pexels-photo-7619941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Lifestyle/Family Photographer', description: 'Comfortable jeans or a midi skirt, a simple knit top, and stylish sneakers or flats. A crossbody bag is essential.', whyItWorks: 'This look is friendly and approachable, which is crucial for making families and children feel comfortable. It’s practical for getting down on the ground to get the perfect shot.', imageUrl: 'https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            { title: 'The Studio Creative', description: 'An oversized linen shirt, comfortable leggings or dark jeans, and easy-to-slip-on shoes like Birkenstocks or flats.', whyItWorks: 'This outfit is all about comfort for long hours in the studio. It’s relaxed and creative, allowing you to focus completely on your art.', imageUrl: 'https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
    },
];

const ProfessionalStyleGuide: React.FC = () => {
    const [selectedProfession, setSelectedProfession] = useState<typeof professionsData[0] | null>(null);
    const [selectedGender, setSelectedGender] = useState<'men' | 'women' | null>(null);

    const handleProfessionSelect = (profession: typeof professionsData[0]) => {
        setSelectedProfession(profession);
        setSelectedGender(null); // Reset gender selection when a new profession is chosen
    }

    const handleBack = () => {
        if (selectedGender) {
            setSelectedGender(null);
        } else {
            setSelectedProfession(null);
        }
    }

    // MODIFIED RENDER FUNCTION
    const renderOutfitDetails = (outfits: any[]) => (
        <div className="space-y-12 animate-fadeIn">
            {outfits.map(outfit => (
                <div key={outfit.title} className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-start gap-6 border border-gray-100">
                    <img
                        src={outfit.imageUrl}
                        alt={outfit.title}
                        className="w-full md:w-1/3 aspect-[3/4] object-cover rounded-lg shadow-md"
                    />
                    <div className="md:w-2/3">
                        <h4 className="font-bold text-2xl text-purple-800">{outfit.title}</h4>
                        <p className="mt-2 text-gray-700 leading-relaxed">{outfit.description}</p>
                        <div className="mt-4 text-sm text-gray-800 bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-900">Why It Works for a {selectedProfession?.name}:</p>
                            <p className="mt-1">{outfit.whyItWorks}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (selectedProfession) {
        return (
            <section id="professional-style" className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <button onClick={handleBack} className="mb-8 text-purple-600 font-semibold hover:text-purple-800 flex items-center">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back
                    </button>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">{selectedProfession.name}</h2>
                        <p className="mt-2 text-lg text-gray-600 italic">{selectedProfession.coreGoal}</p>
                    </div>

                    {!selectedGender ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto">
                            <button onClick={() => setSelectedGender('men')} className="group flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <Users className="h-16 w-16 text-purple-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-2xl font-bold text-gray-700">For Men</span>
                            </button>
                            <button onClick={() => setSelectedGender('women')} className="group flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <User className="h-16 w-16 text-pink-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-2xl font-bold text-gray-700">For Women</span>
                            </button>
                        </div>
                    ) : (
                        renderOutfitDetails(selectedProfession[selectedGender])
                    )}
                </div>
            </section>
        )
    }

    return (
        <section id="professional-style" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Professional Style Guide</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                    Your professional image is a powerful tool. Select your profession to explore curated outfit ideas designed to help you excel.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {professionsData.map(prof => (
                        <button key={prof.name} onClick={() => handleProfessionSelect(prof)} className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl hover:bg-purple-100 transition-all text-center group transform hover:-translate-y-1">
                            <Briefcase className="mx-auto h-12 w-12 text-purple-500 group-hover:text-purple-700 mb-3 transition-colors" />
                            <h3 className="font-semibold text-gray-800">{prof.name}</h3>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfessionalStyleGuide;