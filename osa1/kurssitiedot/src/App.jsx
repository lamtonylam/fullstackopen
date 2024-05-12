const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course} />
            <Content courses={course} />
            <Total courses={course} />
        </div>
    );
};

const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    );
};

const Content = (props) => {
    return (
        <>
            <p>
                <Part
                    course_name={props.courses.parts[0].name}
                    exercises={props.courses.parts[0].exercises}
                />
            </p>
            <p>
                <Part
                    course_name={props.courses.parts[1].name}
                    exercises={props.courses.parts[1].exercises}
                />
            </p>
            <p>
                <Part
                    course_name={props.courses.parts[2].name}
                    exercises={props.courses.parts[2].exercises}
                />
            </p>
        </>
    );
};

const Part = (props) => {
    return (
        <>
            {props.course_name} {props.exercises}
        </>
    );
};

const Total = (props) => {
    const amount0 = props.courses.parts[0].exercises;
    const amount1 = props.courses.parts[1].exercises;
    const amount2 = props.courses.parts[2].exercises;

    return <>Number of exercises {amount0 + amount1 + amount2}</>;
};

export default App;
