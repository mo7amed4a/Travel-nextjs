export const deepSortObjectKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(deepSortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
        const sortedObj = {};

        // Prioritize lastName and firstName
        if (obj.name) {
            sortedObj.name = obj.name;
        }
        if (obj.profilePhoto) {
            sortedObj.profilePhoto = obj.profilePhoto;
        }
        if (obj.firstName) {
            sortedObj.firstName = obj.firstName;
        }
        if (obj.lastName) {
            sortedObj.lastName = obj.lastName;
        }
        if (obj.title) {
            sortedObj.title = obj.title;
        }
        if (obj.titleOutSide) {
            sortedObj.titleOutSide = obj.titleOutSide;
        }
        if (obj.email) {
            sortedObj.email = obj.email;
        }
        if (obj.keyword) {
            sortedObj.keyword = obj.keyword;
        }

        // Sort the rest of the keys, except lastName, firstName, title, createdAt, and updatedAt
        Object.keys(obj)
            .filter(key => key !== 'name' && key !== 'profilePhoto' && key !== 'firstName' && key !== 'lastName' && key !== 'title' && key !== 'titleOutSide' && key !== 'email' && key !== 'createdAt' && key !== 'updatedAt')
            .sort((a, b) => b.localeCompare(a))
            .forEach(key => {
                sortedObj[key] = deepSortObjectKeys(obj[key]);
            });

        // Add createdAt and updatedAt at the end if they exist
        if (obj.createdAt) {
            sortedObj.createdAt = obj.createdAt;
        }
        

        return sortedObj;
    }
    return obj;
};
