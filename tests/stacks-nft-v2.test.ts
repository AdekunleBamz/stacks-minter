import { Clarinet, Tx, Chain, Account, types as Cl } from "clarinet";
import { assertEquals } from "std/testing/asserts.ts";

const CONTRACT = "stacks-nft-v2";

Clarinet.test({
  name: "Minting NFTs works correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const mintPrice = 100000; // 0.1 STX in microSTX

    // Initial total supply
    let block = chain.mineBlock([
      Tx.contractCall(CONTRACT, "get-total-supply", [], deployer.address)
    ]);
    assertEquals(block.receipts[0].result.expectOk().toNumber(), 0);

    // Mint first NFT
    block = chain.mineBlock([
      Tx.contractCall(CONTRACT, "mint", [], user1.address)
    ]);
    const tokenId = block.receipts[0].result.expectOk().toNumber();
    assertEquals(tokenId, 1);

    // Check total supply updated
    block = chain.mineBlock([
      Tx.contractCall(CONTRACT, "get-total-supply", [], deployer.address)
    ]);
    assertEquals(block.receipts[0].result.expectOk().toNumber(), 1);

    // Check owner of token
    block = chain.mineBlock([
      Tx.contractCall(CONTRACT, "get-owner", [Cl.uint(tokenId)], deployer.address)
    ]);
    assertEquals(block.receipts[0].result.expectOk().unwrap(), user1.address);
  }
});

Clarinet.test({
  name: "Mint fails if max supply reached",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;

    // Set max supply to 1
    chain.mineBlock([Tx.contractCall(CONTRACT, "set-max-supply", [Cl.uint(1)], deployer.address)]);

    // Try minting second NFT
    const block = chain.mineBlock([Tx.contractCall(CONTRACT, "mint", [], user1.address)]);
    block.receipts[0].result.expectErr().expectUint(101); // ERR-MAX-SUPPLY-REACHED
  }
});

Clarinet.test({
  name: "Transfers work correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;

    // Mint NFT to user1
    let block = chain.mineBlock([Tx.contractCall(CONTRACT, "mint", [], user1.address)]);
    const tokenId = block.receipts[0].result.expectOk().toNumber();

    // Transfer from user1 -> user2
    block = chain.mineBlock([Tx.contractCall(CONTRACT, "transfer", [Cl.uint(tokenId), Cl.principal(user1.address), Cl.principal(user2.address)], user1.address)]);
    block.receipts[0].result.expectOk();

    // Check new owner
    block = chain.mineBlock([Tx.contractCall(CONTRACT, "get-owner", [Cl.uint(tokenId)], deployer.address)]);
    assertEquals(block.receipts[0].result.expectOk().unwrap(), user2.address);
  }
});

Clarinet.test({
  name: "Pausing and unpausing contract works",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;

    // Pause contract
    let block = chain.mineBlock([Tx.contractCall(CONTRACT, "pause-contract", [], deployer.address)]);
    block.receipts[0].result.expectOk().expectBool(true);

    // Minting fails when paused
    block = chain.mineBlock([Tx.contractCall(CONTRACT, "mint", [], user1.address)]);
    block.receipts[0].result.expectErr().expectUint(105); // ERR-PAUSED

    // Unpause contract
    block = chain.mineBlock([Tx.contractCall(CONTRACT, "unpause-contract", [], deployer.address)]);
    block.receipts[0].result.expectOk().expectBool(true);

    // Mint now works
    block = chain.mineBlock([Tx.contractCall(CONTRACT, "mint", [], user1.address)]);
    block.receipts[0].result.expectOk();
  }
});

Clarinet.test({
  name: "Only owner can update admin settings",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;

    // Non-owner trying to change base URI
    let block = chain.mineBlock([Tx.contractCall(CONTRACT, "set-base-uri", [Cl.stringAscii("new-uri")], user1.address)]);
    block.receipts[0].result.expectErr().expectUint(100); // ERR-NOT-OWNER

    // Owner updates successfully
    block = chain.mineBlock([Tx.contractCall(CONTRACT, "set-base-uri", [Cl.stringAscii("new-uri")], deployer.address)]);
    block.receipts[0].result.expectOk().expectBool(true);
  }
});

Clarinet.test({
  name: "Transfer ownership works",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;

    // Transfer ownership
    let block = chain.mineBlock([Tx.contractCall(CONTRACT, "transfer-ownership", [Cl.principal(user1.address)], deployer.address)]);
    block.receipts[0].result.expectOk().expectBool(true);

    // Verify new owner can perform admin action
    block = chain.mineBlock([Tx.contractCall(CONTRACT, "set-mint-price", [Cl.uint(200000)], user1.address)]);
    block.receipts[0].result.expectOk().expectBool(true);
  }
});
