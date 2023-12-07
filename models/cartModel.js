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

    isInCart(course) {
        // return this.coursesList.map(c => c.id).includes(course.id);
        return this.coursesList.some((c) => c.id == course.id);
    }

    clear() {
        this.coursesList = [];
    }
}

module.exports = Cart;
