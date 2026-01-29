;; NFT Collection Contract for Stacks Blockchain
;; Clarity 4 Epoch 3.3 Compatible
;; Author: Your Name
;; Description: ERC-721 style NFT collection with 0.1 STX minting fee


;; Data maps
(define-data-var total-supply uint u0)
(define-data-var max-supply uint u10000)
(define-data-var base-uri (string-ascii 256) "https://api.stacks-nft.com/metadata/")
(define-data-var image-uri (string-ascii 256) "https://stacks-nft.com/images/")
(define-data-var collection-name (string-ascii 64) "Stacks NFT Collection")
(define-data-var symbol (string-ascii 16) "STACKS-NFT")

;; NFT ownership map
(define-map nft-owner (token-id uint) (owner principal))

;; NFT metadata map
(define-map nft-metadata (token-id uint) {
  name: (string-ascii 128),
  description: (string-ascii 512),
  image: (string-ascii 256),
  attributes: (list 10 {
    trait_type: (string-ascii 64),
    value: (string-ascii 64)
  })
})

;; Error codes
(define-constant ERR_INSUFFICIENT_BALANCE u100)
(define-constant ERR_MAX_SUPPLY_REACHED u101)
(define-constant ERR_NOT_OWNER u102)
(define-constant ERR_TOKEN_NOT_FOUND u103)
(define-constant ERR_INVALID_AMOUNT u104)

;; Read-only functions

(define-read-only (get-total-supply)
  "Get the total number of minted NFTs"
  (ok (var-get total-supply)))

(define-read-only (get-max-supply)
  "Get the maximum supply of NFTs"
  (ok (var-get max-supply)))

(define-read-only (get-owner-of (token-id uint))
  "Get the owner of a specific NFT"
  (match (map-get? nft-owner { token-id: token-id })
    entry (ok (get owner entry))
    (err ERR_TOKEN_NOT_FOUND)))

(define-read-only (get-token-uri (token-id uint))
  "Get the metadata URI for a specific NFT"
  (let ((base (var-get base-uri)))
    (ok (concat base (to-string token-id)))))

(define-read-only (get-collection-info)
  "Get collection metadata"
  (ok {
    name: (var-get collection-name),
    symbol: (var-get symbol),
    total_supply: (var-get total-supply),
    max_supply: (var-get max-supply),
    base_uri: (var-get base-uri)
  }))

;; Public functions

(define-public (mint-nft (amount uint))
  "Mint a new NFT for 0.1 STX per NFT"
  (let ((current-supply (var-get total-supply))
        (max-supply (var-get max-supply))
        (mint-price u100000) ; 0.1 STX in microSTX
        (total-cost (* amount mint-price)))
    
    ;; Check if max supply would be exceeded
    (asserts! (< (+ current-supply amount) max-supply) ERR_MAX_SUPPLY_REACHED)
    
    ;; Check if sender has sufficient balance
    (asserts! (>= (stx-get-balance tx-sender) total-cost) ERR_INSUFFICIENT_BALANCE)
    
    ;; Transfer STX to contract
    (stx-transfer? total-cost tx-sender (as-contract tx-sender))
    
    ;; Mint NFTs
    (let ((new-supply (+ current-supply amount)))
      (var-set total-supply new-supply)
      
      ;; Mint each NFT
      (map (lambda (i)
        (let ((token-id (+ current-supply i)))
          ;; Set ownership
          (map-set nft-owner { token-id: token-id } { owner: tx-sender })
          
          ;; Set metadata
          (map-set nft-metadata { token-id: token-id } {
            name: (concat (var-get collection-name) " #" (to-string token-id)),
            description: "A unique NFT on the Stacks blockchain",
            image: (concat (var-get image-uri) (to-string token-id) ".png"),
            attributes: (list {
              trait_type: "Minted On",
              value: "Stacks"
            } {
              trait_type: "Mint Number",
              value: (to-string token-id)
            })
          })
        )
      ) (range u0 amount))
    )
    
    (ok true)))

(define-public (transfer-nft (token-id uint) (to principal))
  "Transfer NFT to another address"
  (let ((owner (unwrap-panic (get-owner-of token-id))))
    (asserts! (is-eq owner tx-sender) ERR_NOT_OWNER)
    
    ;; Update ownership
    (map-set nft-owner { token-id: token-id } { owner: to })
    
    (ok true)))

(define-public (burn-nft (token-id uint))
  "Burn an NFT (only owner can burn)"
  (let ((owner (unwrap-panic (get-owner-of token-id))))
    (asserts! (is-eq owner tx-sender) ERR_NOT_OWNER)
    
    ;; Remove from ownership map
    (map-delete nft-owner { token-id: token-id })
    
    ;; Remove from metadata map
    (map-delete nft-metadata { token-id: token-id })
    
    (ok true)))

;; Contract management functions (admin only)

(define-data-var admin principal (as-contract tx-sender))

(define-public (set-admin (new-admin principal))
  "Set a new admin for the contract"
  (asserts! (is-eq tx-sender (var-get admin)) ERR_NOT_OWNER)
  (var-set admin new-admin)
  (ok true))

(define-public (withdraw-stx (amount uint))
  "Withdraw STX from contract (admin only)"
  (asserts! (is-eq tx-sender (var-get admin)) ERR_NOT_OWNER)
  (stx-transfer? amount (as-contract tx-sender) tx-sender)
  (ok true))

(define-public (set-base-uri (new-uri (string-ascii 256)))
  "Update the base URI for NFT metadata (admin only)"
  (asserts! (is-eq tx-sender (var-get admin)) ERR_NOT_OWNER)
  (var-set base-uri new-uri)
  (ok true))

(define-public (set-image-uri (new-uri (string-ascii 256)))
  "Update the image URI for NFTs (admin only)"
  (asserts! (is-eq tx-sender (var-get admin)) ERR_NOT_OWNER)
  (var-set image-uri new-uri)
  (ok true))

;; Helper functions

(define-private (to-string (num uint))
  "Convert uint to string"
  (if (is-eq num u0)
    "0"
    (let ((digits (list)))
      (let loop ((n num) (digits digits))
        (if (is-eq n u0)
          digits
          (loop (/ n u10) (cons (mod n u10) digits))
        )
      )
    )
  )
)