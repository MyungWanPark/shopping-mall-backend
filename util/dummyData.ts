/* 
    b@b.com 을 기준으로 함 userId = 11

    클라이언트에서 장바구니 추가

    type CartItemType = {
        id?: number;
        isSelected?: boolean;
        quantity?: number;
        color?: string;
        size?: string;
        totalPricePerProduct?: number;
        productId?: number;
        productPrice?: number;
        isOrdered?: boolean;
        cartId?: number;
}

    1. 장바구니에 여러 상품을 추가함.(/cart/add), body: CartItemType
        1-1. 상품 당 수량은 1-5 사이 랜덤
        1-2. 상품의 종류는 전체 중 3개 랜덤

    2. 해당 장바구니를 주문 처리함(/order/new) 
    body: type OrderType = {
        id?: number;
        cartItemIds?: string;
        createdAt?: Date;
    }

    ------------------------

    신규 유저 추가(/auth/register)



*/

import {
    addToCart,
    getCartByUserId,
    getCartItemsByCartId,
    updateCartItem,
} from "../apis/cart.js";
import { createOrder } from "../apis/order.js";
import { getAllProductsForDummyData } from "../apis/product.js";
import { createUser } from "../apis/user.js";
import { CartItemType } from "../types/cart.js";

export async function makeDummyData() {
    console.log("▶️ 가상 데이터 생성 시작!!");
    await makeDummyOrder();
    await makeDummyOrder();
    await makeDummyOrder();
    await makeDummyUser();
    await makeDummyUser();
    await makeDummyUser();
    console.log("✨ 가상 데이터 제작 완료!!");
}

async function makeDummyOrder() {
    const userId = 11; // 테스터 유저 b 기준
    const cartItemData = await makeDummyCartItemData();
    await addCart(userId, cartItemData); // 장바구니에 추가
    await createDummyOrder(userId); // 주문하기
}

async function makeDummyCartItemData() {
    const allProducts = await getAllProductsForDummyData();
    const productNum = allProducts.length;
    const randomInt = getRandomInt(0, productNum - 1);
    const randomProduct = allProducts[randomInt];
    const color = JSON.parse(randomProduct.colors as string)[0];
    const randomQuantity = getRandomInt(1, 5); // 1~5개 사이의 임의 수량 설정
    const cartItemData = {
        isSelected: true,
        quantity: randomQuantity,
        color: color,
        size: "S",
        productId: randomProduct.id,
        productPrice: randomProduct.price,
        isOrdered: false,
        cartId: 11,
    };
    return cartItemData;
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function addCart(userId: number, cartItemData: CartItemType) {
    await addToCart(userId, cartItemData);
}

async function createDummyOrder(userId: number) {
    const { cartItemIdsToOrder, cartItems } = await getDummyCartItemsAndIds(
        userId
    );
    const IdsToStr = JSON.stringify(cartItemIdsToOrder);
    await createOrder(userId, IdsToStr);
    cartItems.forEach(async (orderedCartItem) => {
        await updateCartItem(userId, {
            ...orderedCartItem?.dataValues,
            isOrdered: true,
        });
    });
}

async function getDummyCartItemsAndIds(userId: number) {
    const cartId = await getCartByUserId(userId).then((cart) => cart?.id);
    const cartItems = await getCartItemsByCartId(cartId!);
    const cartItemIdsToOrder = cartItems
        .filter((cartItem) => cartItem.isSelected)
        .map((cartItem) => cartItem.id);
    return { cartItemIdsToOrder, cartItems };
}

export async function makeDummyUser() {
    const user = getDummyUserData();
    const userId = await createUser(user); // 카트는 생성하지 않음
}

function getDummyUserData() {
    const ageOptions = [
        "10대 ~ 20대",
        "20대 ~ 30대",
        "30대 ~ 40대",
        "40대 ~ 50대",
        "50대 ~ 60대",
        "60대 이상 ",
        "기타",
    ];
    const inflowRouteOptions = [
        { label: "Instagram", value: "instagram" },
        { label: "Facebook", value: "facebook" },
        { label: "직접 검색", value: "directSearch" },
        { label: "기타", value: "etc" },
    ];

    const email = `${Date.now().toString(36)}@example.com`;
    const password = Date.now().toString();
    const age = ageOptions[getRandomInt(0, ageOptions.length - 1)];
    const gender = "남성";
    const name = "랜덤 유저";
    const inflowRoute =
        inflowRouteOptions[getRandomInt(0, inflowRouteOptions.length - 1)]
            .value;

    const userData = {
        email,
        password,
        age,
        gender,
        name,
        inflowRoute,
    };
    return userData;
}
