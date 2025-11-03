import {test as myTest} from "@playwright/test";

type person = {
    email: string
    password: string
}

const myFixtureTest = myTest.extend<person>({
    email: "play.wright11@gmail.com",
    password: "pass123"
})

export const test = myFixtureTest;