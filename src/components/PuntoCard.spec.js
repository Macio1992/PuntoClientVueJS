/* global describe, test, expect, beforeEach */

import { mount } from "@vue/test-utils";
import PuntoCard from "./PuntoCard.vue";

let wrapper;

describe("PuntoCard", () => {
  beforeEach(() => {
    wrapper = mount(PuntoCard);
  });

  test("should render one dot card when 'one' option is passed", async () => {
    await runTestForAllColors("one_dot_card");
  });

  test("should render two dots card when 'two' option is passed", async () => {
    await runTestForAllColors("two_dot_card");
  });

  test("should render three dots card when 'three' option is passed", async () => {
    await runTestForAllColors("three_dot_card");
  });

  test("should render four dots card when 'four' option is passed", async () => {
    await runTestForAllColors("four_dot_card");
  });

  test("should render five dots card when 'five' option is passed", async () => {
    await runTestForAllColors("five_dot_card");
  });

  test("should render six dots card when 'six' option is passed", async () => {
    await runTestForAllColors("six_dot_card");
  });

  test("should render seven dots card when 'seven' option is passed", async () => {
    await runTestForAllColors("seven_DOT_CARD");
  });

  test("should render eight dots card when 'eight' option is passed", async () => {
    await runTestForAllColors("eight_dot_card");
  });

  test("should render nine dots card when 'nine' option is passed", async () => {
    await runTestForAllColors("nine_dot_card");
  });
});

async function verifyDigitsWithColor(wrapper, option, color) {
  await wrapper.setProps({
    option,
    color,
  });

  await wrapper.vm.$nextTick();
  expect(wrapper.findAll(".puntoCard__dot").length).toBe(9);
  expect(wrapper.findAll(".puntoCard__dotWithColor").length).toBe(
    generateDotsAmount(option)
  );
  expect(wrapper.findAll(`.puntoCard__dotWithColor--${color}`).length).toBe(
    generateDotsAmount(option)
  );
}

function generateDotsAmount(option) {
  const digitWords = [
    "one_dot_card",
    "two_dot_card",
    "three_dot_card",
    "four_dot_card",
    "five_dot_card",
    "six_dot_card",
    "seven_dot_card",
    "eight_dot_card",
    "nine_dot_card",
  ];
  return digitWords.indexOf(option) + 1;
}

async function runTestForAllColors(option) {
  wrapper = mount(PuntoCard, {
    props: {
      option,
      color: "red",
    },
  });

  await verifyDigitsWithColor(wrapper, option, "red");
  await verifyDigitsWithColor(wrapper, option, "green");
  await verifyDigitsWithColor(wrapper, option, "orange");
  await verifyDigitsWithColor(wrapper, option, "blue");
}
