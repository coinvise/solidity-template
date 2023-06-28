# :'
# solidity: {
#     compilers: [
#       {
#         version: "0.8.18",
#         settings: {
#           metadata: {
#             // Not including the metadata hash
#             // https://github.com/paulrberg/hardhat-template/issues/31
#             bytecodeHash: "none",
#           },
#           optimizer: {
#             runs: 800,
#             enabled: true,
#           },
#           viaIR: true,
#           outputSelection: {
#             "*": {
#               "*": ["evm.assembly", "irOptimized"],
#             },
#           },
#         },
#       },
#     ],
#   }
# '

CONTRACT="Greeter"
DBG_PATH="artifacts/contracts/greeter/""${CONTRACT}"".sol/""${CONTRACT}"".dbg.json"
BUILD_PATH=$(jq -r '.buildInfo[19:]' "$DBG_PATH")
jq -r '.output.contracts."contracts/greeter/'"${CONTRACT}"'.sol".'"${CONTRACT}"'.irOptimized' \
  artifacts/build-info/"$BUILD_PATH" |
  cat >"contracts/greeter/${CONTRACT}".yul
