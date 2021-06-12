
interface dataInteface {
    header: string,
    fieldName: string,
    type?: string,
    validation?: object,
}

export class InputModal {

    header = ''
    fieldName = '' /* NOTE: Let this match the colomn name to update in database. Otherwise there will be server error. */
    type: any = null/* "type" is the input type. */
    validation: any = null

    set (payload: dataInteface) {

        this.header = payload.header
        this.fieldName = payload.fieldName
        this.validation = payload.validation
        this.type = payload.type
    }

}
