class Cart {
    constructor() {
        this.coursesList = [];
    }

    addCourse(course) {
        this.coursesList.push(course);
    }

    removeCourse(i) {
        this.coursesList.splice(i, 1);
    }

    getCourses() {
        return this.coursesList;
    }

    clear() {
        this.coursesList = [];
    }
}

module.exports = Cart;
