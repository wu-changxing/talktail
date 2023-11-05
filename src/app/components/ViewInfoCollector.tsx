// src/app/components/ClientUserInfoCollector.js
"use client";
import { useEffect } from 'react';
import { collectUserInfo } from './comments/UserInfoCollector';

const ViewinfoCollector = ({slug, source, email, nickname}) => {
    console.log("email, nickname, slug, source", email, nickname, slug, source)
    useEffect(() => {
        async function getUserInfoAndSend() {
            const userInfo = await collectUserInfo();
            console.log("email, nickname, slug, userInfo", email, nickname, slug, userInfo)
            // Send this info to your server
            fetch(`/api/view/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        source,
                        email,
                        nickname,
                        userInfo,
                    }
                    ),

            })
                .then(response => response.json())
                .then(data => console.log(data.message))
                .catch(error => console.error('Error sending user info:', error));
        }

        getUserInfoAndSend();
    }, []);

    return null; // This component does not render anything
};

export default ViewinfoCollector;
