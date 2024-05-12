const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;

    const courses = [
        { part: "Fundamentals of React", exercises: 10 },
        { part: "Using props to pass data", exercises: 7 },
        { part: "State of a component", exercises: 14 },
    ];

    return (
        <div>
            <Header course={course} />
            <Content courses={courses} />
            <Total courses={courses} />
        </div>
    );
};

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    );
};

const Content = (props) => {
    return (
        <>
            <p>
                <Part course={props.courses[0]} />
            </p>
            <p>
                <Part course={props.courses[1]} />
            </p>
            <p>
                <Part course={props.courses[2]} />
            </p>
        </>
    );
};

const Part = (props) => {
    return (
        <>
            {props.course.part} {props.course.exercises}
        </>
    );
};

const Total = (props) => {
    const amount0 = props.courses[0].exercises;
    const amount1 = props.courses[1].exercises;
    const amount2 = props.courses[2].exercises;

    return <>Number of exercises {amount0 + amount1 + amount2}</>;
};

export default App;
