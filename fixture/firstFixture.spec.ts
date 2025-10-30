import {test as myTest} from "@playwright/test";

type person = {
    age: number,
    email: string
}

const myFixtureTest = myTest.extend<person>({
    age: 27,
    email: "swathi@playwrightConfig.com"
})

export const test = myFixtureTest;