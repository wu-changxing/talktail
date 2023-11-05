"use client";
import { useEffect } from 'react';
import { collectUserInfo } from './comments/UserInfoCollector';

const ViewinfoCollector = ({slug, source, email, nickname}) => {
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedNickname = localStorage.getItem('nickname');

        console.log("slug, source, email, nickname", slug, source, email, nickname);
        console.log("storedEmail, storedNickname", storedEmail, storedNickname)
        // Use stored values if props are not provided
        const userEmail = email || storedEmail;
        const userNickname = nickname || storedNickname;

        // Update localStorage if new values are provided
        if (!storedEmail) {
            localStorage.setItem('email', email);
        }
        if (!storedNickname) {
            localStorage.setItem('nickname', nickname);
        }

        // Record the start time
        const startTime = Date.now();

        // Function to send data to server
        async function sendViewInfo(duration) {
            const userInfo = await collectUserInfo();
            console.log("email, nickname, slug, userInfo", email, nickname, slug, userInfo);

            fetch(`/api/view/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source,
                    email,
                    nickname,
                    duration,
                    userInfo,
                }),
            })
                .then(response => response.json())
                .then(data => console.log(data.message))
                .catch(error => console.error('Error sending user info:', error));
        }

        // When component unmounts, calculate duration and send data
        return () => {
            const duration = Date.now() - startTime;
            sendViewInfo(duration);
        };
    }, [email, nickname, slug, source]);

    return null; // This component does not render anything
};

export default ViewinfoCollector;
