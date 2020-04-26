import { DefaultDeadline } from '@burstjs/core'
import { calculateMinimumCreationFee } from '@burstjs/contracts'
import { burstService } from '../__helpers__/burstService'

export const post = async (req, res) => {

    const { code } = req.body

    const parameters = {
        ...req.body,
        deadline: DefaultDeadline,
        feeNQT: calculateMinimumCreationFee(code, true).getPlanck(),
        cspages: 1,
        dpages: 1,
        uspages: 1,
        broadcast: true,
    };

    try {
        const response = await burstService.send('createATProgram', parameters);
        console.log('Response', response)
        const {unsignedTransactionBytes: unsignedHexMessage } = response
        return res.end(unsignedHexMessage)
    } catch (e) {
        res.statusCode = 500
        console.log('Error', e)
        return res.end(e.message)
    }
}
