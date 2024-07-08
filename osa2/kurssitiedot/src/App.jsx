const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1,
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2,
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3,
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

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

    return (
        <div>
            <Course courses={courses} />
        </div>
    );
};

export default App;
