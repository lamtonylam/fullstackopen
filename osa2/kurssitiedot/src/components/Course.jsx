const Course = (props) => {
    const { courses } = props;

    return (
        <div>
            {courses.map((course) => (
                <div key={course.id}>
                    <Header course={course} />
                    <Content course={course} />
                    <Total course={course} />
                </div>
            ))}
        </div>
    );
};

const Header = (props) => {
    return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
    const courses = props.course.parts;
    return (
        <div>
            {courses.map((course) => (
                <Part key={course.id} course={course} />
            ))}
        </div>
    );
};

const Part = (props) => {
    return (
        <p>
            {props.course.name} {props.course.exercises}
        </p>
    );
};

const Total = (props) => {
    const courses = props.course.parts;

    const totalamount = courses.reduce(function (sum, course) {
        return sum + course.exercises;
    }, 0);

    return (
        <div>
            <p>
                <b>total of {totalamount} exercises</b>
            </p>
        </div>
    );
};

export default Course;
