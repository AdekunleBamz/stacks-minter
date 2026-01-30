;; Stacks NFT Collection Contract v2
;; Clarity 2 Compatible
;; Description: Simple NFT collection with 0.1 STX minting fee
;; Fixed: Removed recursive functions

;; Define the NFT
(define-non-fungible-token stacks-nft uint)

;; Data variables
(define-data-var total-supply uint u0)
(define-data-var max-supply uint u10000)
(define-data-var mint-price uint u100000) ;; 0.1 STX in microSTX
(define-data-var base-uri (string-ascii 256) "https://api.stacks-nft.com/metadata/")
(define-data-var collection-name (string-ascii 64) "Stacks NFT Collection")
(define-data-var contract-owner principal tx-sender)
(define-data-var is-paused bool false)

;; Error codes
(define-constant ERR-NOT-OWNER (err u100))
(define-constant ERR-MAX-SUPPLY-REACHED (err u101))
(define-constant ERR-INSUFFICIENT-BALANCE (err u102))
(define-constant ERR-TOKEN-NOT-FOUND (err u103))
(define-constant ERR-NOT-AUTHORIZED (err u104))
(define-constant ERR-PAUSED (err u105))
(define-constant ERR-TRANSFER-FAILED (err u106))

;; SIP-009 NFT trait implementation
(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;; Read-only functions

(define-read-only (get-last-token-id)
  (ok (var-get total-supply)))

(define-read-only (get-token-uri (token-id uint))
  (ok (some (var-get base-uri))))

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? stacks-nft token-id)))

(define-read-only (get-total-supply)
  (ok (var-get total-supply)))

(define-read-only (get-max-supply)
  (ok (var-get max-supply)))

(define-read-only (get-mint-price)
  (ok (var-get mint-price)))

(define-read-only (get-collection-info)
  (ok {
    name: (var-get collection-name),
    total-supply: (var-get total-supply),
    max-supply: (var-get max-supply),
    mint-price: (var-get mint-price),
    base-uri: (var-get base-uri),
    owner: (var-get contract-owner)
  }))

(define-read-only (is-contract-paused)
  (ok (var-get is-paused)))

;; SIP-009 transfer function
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (asserts! (not (var-get is-paused)) ERR-PAUSED)
    (nft-transfer? stacks-nft token-id sender recipient)))

;; Mint function - costs 0.1 STX per NFT
(define-public (mint)
  (let (
    (current-supply (var-get total-supply))
    (new-token-id (+ current-supply u1))
    (price (var-get mint-price))
    (owner (var-get contract-owner))
  )
    ;; Check if paused
    (asserts! (not (var-get is-paused)) ERR-PAUSED)
    ;; Check max supply
    (asserts! (< current-supply (var-get max-supply)) ERR-MAX-SUPPLY-REACHED)
    ;; Transfer payment to contract owner
    (try! (stx-transfer? price tx-sender owner))
    ;; Mint the NFT
    (try! (nft-mint? stacks-nft new-token-id tx-sender))
    ;; Update supply
    (var-set total-supply new-token-id)
    (ok new-token-id)))

;; Admin functions

(define-public (set-base-uri (new-uri (string-ascii 256)))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-OWNER)
    (var-set base-uri new-uri)
    (ok true)))

(define-public (set-mint-price (new-price uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-OWNER)
    (var-set mint-price new-price)
    (ok true)))

(define-public (set-max-supply (new-max uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-OWNER)
    (asserts! (>= new-max (var-get total-supply)) ERR-NOT-AUTHORIZED)
    (var-set max-supply new-max)
    (ok true)))

(define-public (pause-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-OWNER)
    (var-set is-paused true)
    (ok true)))

(define-public (unpause-contract)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-OWNER)
    (var-set is-paused false)
    (ok true)))

(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-OWNER)
    (var-set contract-owner new-owner)
    (ok true)))
