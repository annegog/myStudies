function calculate(courses) {
    let totalEcts = 0;
    let totalPoints = 0;

    for (const course of courses) {
        totalEcts += course.ects;
        totalPoints += course.grade * course.ects;
    }

    const gpa = totalPoints / totalEcts;

    return gpa;
}