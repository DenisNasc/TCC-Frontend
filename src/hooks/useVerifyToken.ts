import {useState, useEffect} from 'react';

import {axiosDevInstance} from 'axiosInstances';

const useVerifyUserJWT = (userJWT: string) => {
    const [answerFromServer, setAnswerFromServer] = useState(null);
    const axiosDev = axiosDevInstance('');

    useEffect(() => {
        const verifyUserJWTOnServer = async () => {
            try {
                const {data} = await axiosDev.post('/auth', userJWT);
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
