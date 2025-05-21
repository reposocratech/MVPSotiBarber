import bcrypt from 'bcrypt';

export const hashString = async (string) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(string, saltRounds);
    } catch (error) {
        throw error
    }
}

export const compareString = async (string, hashString) => {
    try {
        const match = bcrypt.compare(string, hashString);
        return match
    } catch (error) {
        throw error;
    }
}