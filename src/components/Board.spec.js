/* global test, expect, describe, jest, beforeEach, afterEach */
import { mount, config } from "@vue/test-utils";
import Board from "./Board.vue";
import PuntoCard from "./PuntoCard.vue";
import io from "socket.io-client";

let mockSocket, endpoint;

jest.mock("socket.io-client", () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

const EMPTY_BOARD = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

const SAMPLE_BOARD = [
  [null, null, null, null, null, null],
  [null, { color: "red", card: "one_dot_card" }, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, { color: "green", card: "five_dot_card" }, null, null, null],
];

describe("Board", () => {
  beforeEach(() => {
    endpoint = "localhost:3000";
    mockSocket = io(endpoint);
    config.global.mocks["$socketio"] = mockSocket;
  });

  afterEach(() => jest.clearAllMocks());

  test("should render empty board when receiving empty board from socket server", async () => {
    const wrapper = mount(Board);

    expect(mockSocket.on).toHaveBeenCalledTimes(2);
    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendBoardFromServer");
    expect(mockSocket.on.mock.calls[1][0]).toEqual("SendActivePlayer");

    mockSocket.on.mock.calls[0][1](EMPTY_BOARD);
    mockSocket.on.mock.calls[1][1]("red");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().setActivePlayer).toBeTruthy();
    expect(wrapper.vm.activePlayer).toBe("red");
    expect(
      wrapper
        .find(".board")
        .classes()
        .indexOf("board--blocked")
    ).not.toBe(-1);

    expect(wrapper.vm.board).toEqual(EMPTY_BOARD);
    expect(wrapper.findAll(".board__row").length).toBe(6);
    expect(wrapper.findAll(".board__cell").length).toBe(36);
    expect(wrapper.findAllComponents(PuntoCard).length).toBe(0);
  });

  test("should render board with two cards when receiving a board from socket server", async () => {
    const wrapper = mount(Board,);

    expect(mockSocket.on).toHaveBeenCalledTimes(2);
    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendBoardFromServer");

    mockSocket.on.mock.calls[0][1](SAMPLE_BOARD);

    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(PuntoCard).length).toBe(2);
    expect(wrapper.vm.board).toEqual(SAMPLE_BOARD);
    expect(wrapper.findAll(".board__cell")[7].html()).toContain("puntoCard");
    expect(wrapper.findAll(".board__cell")[32].html()).toContain("puntoCard");
  });

  test("should show punto card when board cell has been clicked", async () => {
    const wrapper = mount(Board, {
      props: {
        card: "three_dot_card",
        color: "red",
      },
    });

    expect(mockSocket.on.mock.calls[0][0]).toEqual("SendBoardFromServer");
    mockSocket.on.mock.calls[0][1](EMPTY_BOARD);

    await wrapper.findAll(".board__cell")[0].trigger("click");
    await wrapper.vm.$nextTick();

    expect(mockSocket.on).toHaveBeenCalledTimes(3);

    expect(mockSocket.emit).toHaveBeenCalledTimes(3);
    expect(mockSocket.emit.mock.calls[0][0]).toEqual("SendBoardFromClient");
    expect(mockSocket.emit.mock.calls[1][0]).toEqual("SendCardsFromClient");
    expect(mockSocket.emit.mock.calls[2][0]).toEqual("SendNextPlayer");

    expect(mockSocket.emit.mock.calls[0][1]).toEqual(EMPTY_BOARD);
    expect(mockSocket.emit.mock.calls[1][1]).toEqual({
      color: "red",
      cards: [
        "one_dot_card",
        "one_dot_card",
        "two_dot_card",
        "two_dot_card",
        "three_dot_card",
        "four_dot_card",
        "four_dot_card",
        "five_dot_card",
        "five_dot_card",
        "six_dot_card",
        "six_dot_card",
        "seven_dot_card",
        "seven_dot_card",
        "eight_dot_card",
        "eight_dot_card",
        "nine_dot_card",
        "nine_dot_card",
      ],
    });
    expect(mockSocket.emit.mock.calls[2][1]).toEqual(undefined);

    expect(wrapper.vm.cards.length).toBe(17);

    expect(wrapper.findAllComponents(PuntoCard).length).toBe(1);
    expect(wrapper.vm.board[0][0]).toEqual({
      color: "red",
      card: "three_dot_card",
    });
    expect(wrapper.findAll(".board__cell")[0].html()).toContain("puntoCard");
  });

  test("should cover already put card with another one only if existing one is lover than new one", async () => {
    const wrapper = mount(Board, {
      props: {
        card: "three_dot_card",
        color: "red",
      },
    });
    expect(mockSocket.on).toHaveBeenCalledTimes(2);

    await wrapper.findAll(".board__cell")[0].trigger("click");

    expect(mockSocket.on).toHaveBeenCalledTimes(3);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.board[0][0]).toEqual(
      { color: 'red', card: 'three_dot_card' }
    );

    await wrapper.setProps({ card: "four_dot_card" });
    await wrapper.findAll(".board__cell")[0].trigger("click");

    expect(mockSocket.on).toHaveBeenCalledTimes(4);

    expect(wrapper.vm.board[0][0]).toEqual(
      { color: 'red', card: 'four_dot_card' }
    );

    await wrapper.setProps({ card: "two_dot_card" });
    await wrapper.findAll(".board__cell")[0].trigger("click");

    // it's not 5 because new chosen card is not greater than current one
    // current one is 4 (four_dot_card), the new one is 2 (two_dot_card)
    expect(mockSocket.on).toHaveBeenCalledTimes(4);

    expect(wrapper.vm.board[0][0]).toEqual(
      { color: 'red', card: 'four_dot_card' }
    );
  });
});
