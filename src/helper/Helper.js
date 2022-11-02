class Helper{
    static formatCurrency(number){
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    }

    static getFilename(filePath){
        if(filePath){
            return filePath.split("/").pop().split('.')[0];
        }
        return null;
    }
}

export default Helper;