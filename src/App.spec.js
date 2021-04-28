/* global test, expect, jest, afterEach, beforeEach */
import { mount } from "@vue/test-utils";
import App from "./App.vue";
import io from "socket.io-client";

jest.mock("socket.io-client", () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

let mockSocket, endpoint;

beforeEach(() => {
  endpoint = "localhost:3000";
  mockSocket = io(endpoint);
});

afterEach(() => jest.clearAllMocks());

test("should render App and connect to socket io client and retrieve players on start", async () => {
  const wrapper = mount(App);
  expect(wrapper.html()).toBeTruthy();

  expect(mockSocket.on).toHaveBeenCalledTimes(1);
  expect(mockSocket.on.mock.calls[0][0]).toEqual("SendPlayers");
  mockSocket.on.mock.calls[0][1]([
    { id: "id_1", playerName: "playerName-red", color: "red" },
  ]);
  await wrapper.vm.$nextTick();
  expect(wrapper.findAll(".player").length).toBe(1);
  expect(wrapper.vm.players).toEqual([
    { id: "id_1", playerName: "playerName-red", color: "red" },
  ]);
});

test("should emit joining to the game and retrieve joined players on button click", async () => {
  const wrapper = mount(App);
  await wrapper.find("button").trigger("click");
  expect(mockSocket.emit).toHaveBeenCalledWith("JoinGame");
  expect(mockSocket.emit).toHaveBeenCalledTimes(1);
  expect(mockSocket.on).toHaveBeenCalledTimes(2);
  expect(mockSocket.on.mock.calls[0][0]).toEqual("SendPlayers");

  mockSocket.on.mock.calls[0][1]([
    { id: "id_1", playerName: "playerName-red", color: "red" },
    { id: "id_2", playerName: "playerName-blue", color: "blue" }
  ]);
  await wrapper.vm.$nextTick();
  expect(wrapper.findAll(".player").length).toBe(2);
  expect(wrapper.vm.players).toEqual([
    { id: "id_1", playerName: "playerName-red", color: "red" },
    { id: "id_2", playerName: "playerName-blue", color: "blue" }
  ]);
});
