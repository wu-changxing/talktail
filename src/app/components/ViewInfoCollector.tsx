"use client";
import { useEffect } from 'react';
import { collectUserInfo } from './comments/UserInfoCollector';
interface ViewinfoCollectorProps {
    slug: string;
    source: string;
    email?: string;
    nickname?: string;
}
const ViewinfoCollector = ({slug, source, email, nickname}:ViewinfoCollectorProps) => {
    useEffect(() => {
        async function registerUser(email, nickname) {
            try {
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, nickname,password:nickname }),
                });
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
            } catch (error) {
                console.error('Error registering user:', error);
            }
        }

        const storedEmail = localStorage.getItem('email');
        const storedNickname = localStorage.getItem('nickname');
        const storedToken = localStorage.getItem('token');

        if (!storedEmail || !storedNickname || !storedToken) {
            // Register the user if email, nickname, or token are not in local storage
            registerUser(email || 'default@example.com', nickname || 'Anonymous');
            localStorage.setItem('email', email);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('needChangePassword', true);
        }

        // Update localStorage if new values are provided

        // Record the start time
        const startTime = Date.now();

        // Function to send data to server
        async function sendViewInfo(duration) {
            const userInfo = await collectUserInfo();
            console.log("slug, userInfo", slug, userInfo);

            fetch(`/api/view/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source,
                    email: localStorage.getItem('email'),
                    nickname: localStorage.getItem('nickname'),
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
    }, []);

    return null; // This component does not render anything
};

export default ViewinfoCollector;
