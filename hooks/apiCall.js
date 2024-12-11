import axios from '../lib/axios';
import { showNotification } from '@/util/common';

export async function apiRequest(serviceName, payload) {

    try {

        const response = await axios.post(serviceName, payload);

        if (response?.status === 200) {

            if (response?.data) {

                let status = response?.data?.status
                let message = response?.data?.msg

                message && showNotification(status, message)

                return response?.data

            } else {
                showNotification(false, 'Invalid request details.')
            }

        } else {

            showNotification(false, 'Invalid request details.')
        }

    } catch (e) {

        console.log('eeee', e)
    }
}