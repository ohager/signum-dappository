import { DefaultDeadline, publishContract } from '@burstjs/core'
import { calculateMinimumCreationFee } from '@burstjs/contracts'
import { burstService } from '../__helpers__/burstService'

export const post = async (req, res) => {

    const { code } = req.body
    const parameters = {
        ...req.body,
        deadline: DefaultDeadline,
        feeNQT: calculateMinimumCreationFee(code),
        cspages: 1,
        dpages: 1,
        uspages: 1,
        broadcast: true,
    }

    try {
        const { unsignedTransactionBytes: unsignedHexMessage } = await publishContract(burstService)(parameters)
        return res.end(unsignedHexMessage)
    } catch (e) {
        res.statusCode = 500
        console.log('Error', e)
        return res.end(e.message)
    }
}
