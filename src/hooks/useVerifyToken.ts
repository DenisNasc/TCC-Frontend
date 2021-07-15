import {useState, useEffect} from 'react';

import {axiosDevInstance} from 'axiosInstances';

const useVerifyUserJWT = (userJWT: string) => {
    const [answerFromServer, setAnswerFromServer] = useState(null);

    useEffect(() => {
        const verifyUserJWTOnServer = async () => {
            try {
                const {data} = await axiosDevInstance({}).post('/auth', userJWT);
                setAnswerFromServer(data);
            } catch (error) {
                setAnswerFromServer(null);
            }
        };

        verifyUserJWTOnServer();
    }, [userJWT]);

    return answerFromServer;
};

export default useVerifyUserJWT;
